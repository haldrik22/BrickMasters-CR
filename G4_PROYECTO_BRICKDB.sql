--INICIO: Creación del usuario y esquema para el proyecto. Ambos nombrados G4_PROYECTO_BRICKDB
--GRANTS CONCEDIDOS: DBA, CONNECT, RESOURCE.

--Probando conexión GIT con Oracle SQL Developer

-- Tabla FIDE_ESTADO_TB
CREATE TABLE FIDE_ESTADO_TB (
    FIDE_ESTADO_V_Id_estado_PK NUMBER PRIMARY KEY,
    V_Tipo VARCHAR2(20) NOT NULL,
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_LOCALES_TB
CREATE TABLE FIDE_LOCALES_TB (
    FIDE_LOCALES_V_Id_local_PK NUMBER PRIMARY KEY,
    V_Nom_local VARCHAR2(25),
    V_Tel_local VARCHAR2(15), -- Cambiado a VARCHAR2 para permitir formatos de teléfono
    V_Direccion_local VARCHAR2(200),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20),
    FIDE_LOCALES_V_Id_estado_FK NUMBER, -- Nuevo campo para estado
    FOREIGN KEY (FIDE_LOCALES_V_Id_estado_FK) REFERENCES FIDE_ESTADO_TB(FIDE_ESTADO_V_Id_estado_PK)
);

-- Tabla FIDE_CLIENTES_TB
CREATE TABLE FIDE_CLIENTES_TB (
    FIDE_CLIENTES_V_Id_cliente_PK NUMBER PRIMARY KEY,
    V_Nom_cliente VARCHAR2(25),
    V_Ape_cliente VARCHAR2(30),
    V_Correo_cliente VARCHAR2(50),
    V_Tel_cliente VARCHAR2(15), -- Cambiado a VARCHAR2 para formatos de teléfono
    V_Direccion_cliente VARCHAR2(200),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20),
    FIDE_CLIENTES_V_Id_estado_FK NUMBER, -- Nuevo campo para estado
    FOREIGN KEY (FIDE_CLIENTES_V_Id_estado_FK) REFERENCES FIDE_ESTADO_TB(FIDE_ESTADO_V_Id_estado_PK)
);

-- Tabla FIDE_PRODUCTOS_TB
CREATE TABLE FIDE_PRODUCTOS_TB (
    FIDE_PRODUCTOS_V_Id_producto_PK NUMBER PRIMARY KEY,
    V_Nom_producto VARCHAR2(30),
    V_Piezas_producto NUMBER,
    V_Precio_producto NUMBER(8,2),
    V_Cantidad_producto NUMBER,
    V_Descripcion_producto VARCHAR2(100),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20),
    FIDE_PRODUCTOS_V_Id_estado_FK NUMBER, -- Nuevo campo para estado
    FOREIGN KEY (FIDE_PRODUCTOS_V_Id_estado_FK) REFERENCES FIDE_ESTADO_TB(FIDE_ESTADO_V_Id_estado_PK)
);

-- Tabla FIDE_PROVEEDORES_TB
CREATE TABLE FIDE_PROVEEDORES_TB (
    FIDE_PROVEEDORES_V_Id_proveedor_PK NUMBER PRIMARY KEY,
    V_Nom_provedor VARCHAR2(50),
    V_Correo_proveedor VARCHAR2(50),
    V_Producto_proveedor VARCHAR2(30),
    V_Tel_proveedor VARCHAR2(15), -- Cambiado a VARCHAR2 para formatos de teléfono
    V_Direccion_proveedor VARCHAR2(200),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20),
    FIDE_PROVEEDORES_V_Id_estado_FK NUMBER, -- Nuevo campo para estado
    FOREIGN KEY (FIDE_PROVEEDORES_V_Id_estado_FK) REFERENCES FIDE_ESTADO_TB(FIDE_ESTADO_V_Id_estado_PK)
);

-- Tabla FIDE_TIPO_DESCUENTO_TB
CREATE TABLE FIDE_TIPO_DESCUENTO_TB (
    FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK NUMBER PRIMARY KEY,
    FIDE_TIPO_DESCUENTO_V_Id_cliente_FK NUMBER,
    FIDE_TIPO_DESCUENTO_V_Id_estado_FK NUMBER,
    V_Porcentaje_descuento NUMBER(5,2), -- Ajustado para porcentajes hasta 100%
    FOREIGN KEY (FIDE_TIPO_DESCUENTO_V_Id_cliente_FK) REFERENCES FIDE_CLIENTES_TB(FIDE_CLIENTES_V_Id_cliente_PK),
    FOREIGN KEY (FIDE_TIPO_DESCUENTO_V_Id_estado_FK) REFERENCES FIDE_ESTADO_TB(FIDE_ESTADO_V_Id_estado_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_DESCUENTOS_TB
CREATE TABLE FIDE_DESCUENTOS_TB (
    FIDE_DESCUENTOS_V_Id_descuento_PK NUMBER PRIMARY KEY,
    FIDE_DESCUENTOS_V_Id_cliente_FK NUMBER,
    FIDE_DESCUENTOS_V_Id_tipo_descuento_FK NUMBER,
    FOREIGN KEY (FIDE_DESCUENTOS_V_Id_cliente_FK) REFERENCES FIDE_CLIENTES_TB(FIDE_CLIENTES_V_Id_cliente_PK),
    FOREIGN KEY (FIDE_DESCUENTOS_V_Id_tipo_descuento_FK) REFERENCES FIDE_TIPO_DESCUENTO_TB(FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_CATALOGO_TB
CREATE TABLE FIDE_CATALOGO_TB (
    FIDE_CATALOGO_V_Id_producto_PK NUMBER PRIMARY KEY,
    V_Nom_producto VARCHAR2(30),
    V_Precio_producto NUMBER(8,2),
    V_Descripcion_producto VARCHAR2(200),
    V_Cantidad_producto NUMBER,
    FOREIGN KEY (FIDE_CATALOGO_V_Id_producto_PK) REFERENCES FIDE_PRODUCTOS_TB(FIDE_PRODUCTOS_V_Id_producto_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_PROVEEDORES_PRODUCTO_TB
CREATE TABLE FIDE_PROVEEDORES_PRODUCTO_TB (
    FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK NUMBER,
    FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK NUMBER,
    PRIMARY KEY (FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK, FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK),
    FOREIGN KEY (FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK) REFERENCES FIDE_PROVEEDORES_TB(FIDE_PROVEEDORES_V_Id_proveedor_PK),
    FOREIGN KEY (FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK) REFERENCES FIDE_PRODUCTOS_TB(FIDE_PRODUCTOS_V_Id_producto_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_ENTREGAS_TB
CREATE TABLE FIDE_ENTREGAS_TB (
    FIDE_ENTREGAS_V_Id_entrega_PK NUMBER PRIMARY KEY,
    FIDE_ENTREGAS_V_Id_cliente_FK NUMBER,
    V_Direccion_cliente VARCHAR2(200),
    V_Tel_cliente VARCHAR2(15), -- Cambiado a VARCHAR2 para formatos de teléfono
    FOREIGN KEY (FIDE_ENTREGAS_V_Id_cliente_FK) REFERENCES FIDE_CLIENTES_TB(FIDE_CLIENTES_V_Id_cliente_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_FACTURACION_TB
CREATE TABLE FIDE_FACTURACION_TB (
    FIDE_FACTURACION_V_Id_factura_PK NUMBER PRIMARY KEY,
    FIDE_FACTURACION_V_Id_producto_FK NUMBER,
    FIDE_FACTURACION_V_Id_descuento_FK NUMBER,
    FIDE_FACTURACION_V_Id_cliente_FK NUMBER,
    FIDE_FACTURACION_V_Id_local_FK VARCHAR2(25),
    V_Cantidad_producto NUMBER,
    V_Precio_Subtotal NUMBER(8,2),
    V_Precio_Total NUMBER(8,2),
    V_Fecha_pago DATE,
    FOREIGN KEY (FIDE_FACTURACION_V_Id_producto_FK) REFERENCES FIDE_PRODUCTOS_TB(FIDE_PRODUCTOS_V_Id_producto_PK),
    FOREIGN KEY (FIDE_FACTURACION_V_Id_descuento_FK) REFERENCES FIDE_DESCUENTOS_TB(FIDE_DESCUENTOS_V_Id_descuento_PK),
    FOREIGN KEY (FIDE_FACTURACION_V_Id_cliente_FK) REFERENCES FIDE_CLIENTES_TB(FIDE_CLIENTES_V_Id_cliente_PK),
    FOREIGN KEY (FIDE_FACTURACION_V_Id_local_FK) REFERENCES FIDE_LOCALES_TB(FIDE_LOCALES_V_Id_local_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);

-- Tabla FIDE_VENTAS_TB
CREATE TABLE FIDE_VENTAS_TB (
    FIDE_VENTAS_V_Id_venta_PK NUMBER PRIMARY KEY,
    FIDE_VENTAS_V_Id_factura_FK NUMBER,
    FIDE_VENTAS_V_Id_producto_FK NUMBER,
    FIDE_VENTAS_V_Id_local_FK VARCHAR2(25),
    FIDE_VENTAS_V_Id_entrega_FK NUMBER,
    FOREIGN KEY (FIDE_VENTAS_V_Id_factura_FK) REFERENCES FIDE_FACTURACION_TB(FIDE_FACTURACION_V_Id_factura_PK),
    FOREIGN KEY (FIDE_VENTAS_V_Id_producto_FK) REFERENCES FIDE_PRODUCTOS_TB(FIDE_PRODUCTOS_V_Id_producto_PK),
    FOREIGN KEY (FIDE_VENTAS_V_Id_local_FK) REFERENCES FIDE_LOCALES_TB(FIDE_LOCALES_V_Id_local_PK),
    FOREIGN KEY (FIDE_VENTAS_V_Id_entrega_FK) REFERENCES FIDE_ENTREGAS_TB(FIDE_ENTREGAS_V_Id_entrega_PK),
    V_Creado_por VARCHAR2(20),
    V_Modificado_por VARCHAR2(20),
    V_Fecha_de_creacion DATE,
    V_Fecha_de_modificacion DATE,
    V_Accion VARCHAR2(20)
);


