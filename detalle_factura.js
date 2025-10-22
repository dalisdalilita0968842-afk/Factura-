const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Detalle = sequelize.define('DetalleFactura', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'detalle_factura',
    timestamps: false
  });

  // Hook para calcular subtotal cuando se crea/actualiza un detalle
  Detalle.beforeSave((detalle) => {
    // multiplicación digit-by-digit conceptually: use JS numeric math but DB keeps precision via DECIMAL
    detalle.subtotal = (Number(detalle.cantidad) * Number(detalle.precio_unitario)).toFixed(2);
  });

  return Detalle;
};
