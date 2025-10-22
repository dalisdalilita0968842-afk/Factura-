const express = require("express");
const router = express.Router();
const { Factura, DetalleFactura } = require("../models");
const { optionalAuth } = require("../middleware/auth");

// GET /api/facturas
router.get("/", optionalAuth, async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      include: [{ model: DetalleFactura, as: "detalles" }],
    });
    res.json(facturas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener facturas" });
  }
});

// GET /api/facturas/:id
router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id, {
      include: [{ model: DetalleFactura, as: "detalles" }],
    });
    if (!factura)
      return res.status(404).json({ error: "Factura no encontrada" });
    res.json(factura);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener factura" });
  }
});

// POST /api/facturas
// body: { cliente: "...", fecha: "...", detalles: [{producto, cantidad, precio_unitario}, ...] }
router.post("/", optionalAuth, async (req, res) => {
  const t = await Factura.sequelize.transaction();
  try {
    const { cliente, fecha, detalles } = req.body;
    if (!cliente) {
      await t.rollback();
      return res.status(400).json({ error: "campo cliente es obligatorio" });
    }
    const factura = await Factura.create(
      { cliente, fecha },
      { transaction: t }
    );

    let total = 0;
    if (Array.isArray(detalles) && detalles.length > 0) {
      for (const d of detalles) {
        if (!d.producto || d.cantidad == null || d.precio_unitario == null) {
          await t.rollback();
          return res
            .status(400)
            .json({
              error:
                "cada detalle requiere producto, cantidad y precio_unitario",
            });
        }
        const created = await DetalleFactura.create(
          {
            factura_id: factura.id,
            producto: d.producto,
            cantidad: d.cantidad,
            precio_unitario: d.precio_unitario,
          },
          { transaction: t }
        );
        total += Number(created.subtotal);
      }
    }

    factura.total = total.toFixed(2);
    await factura.save({ transaction: t });
    await t.commit();

    const facturaFull = await Factura.findByPk(factura.id, {
      include: [{ model: DetalleFactura, as: "detalles" }],
    });
    res.status(201).json(facturaFull);
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: "Error al crear factura" });
  }
});

// PUT /api/facturas/:id
// Reemplaza info de factura y sus detalles (detalles enviados reemplazan a los anteriores)
router.put("/:id", optionalAuth, async (req, res) => {
  const t = await Factura.sequelize.transaction();
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) {
      await t.rollback();
      return res.status(404).json({ error: "Factura no encontrada" });
    }
    const { cliente, fecha, detalles } = req.body;
    if (cliente) factura.cliente = cliente;
    if (fecha) factura.fecha = fecha;
    await factura.save({ transaction: t });

    // eliminar detalles anteriores
    await DetalleFactura.destroy({
      where: { factura_id: factura.id },
      transaction: t,
    });

    let total = 0;
    if (Array.isArray(detalles) && detalles.length > 0) {
      for (const d of detalles) {
        const created = await DetalleFactura.create(
          {
            factura_id: factura.id,
            producto: d.producto,
            cantidad: d.cantidad,
            precio_unitario: d.precio_unitario,
          },
          { transaction: t }
        );
        total += Number(created.subtotal);
      }
    }
    factura.total = total.toFixed(2);
    await factura.save({ transaction: t });
    await t.commit();

    const facturaFull = await Factura.findByPk(factura.id, {
      include: [{ model: DetalleFactura, as: "detalles" }],
    });
    res.json(facturaFull);
  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: "Error al actualizar factura" });
  }
});

// DELETE /api/facturas/:id
router.delete("/:id", optionalAuth, async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura)
      return res.status(404).json({ error: "Factura no encontrada" });
    await factura.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar factura" });
  }
});

module.exports = router;
