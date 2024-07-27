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
    FIDE_FACTURACION_V_Id_local_FK NUMBER,
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
    FIDE_VENTAS_V_Id_local_FK NUMBER,
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
-- Comentario ejemplo

--Procedimientos CRUD para FIDE_LOCALES_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo local en la tabla FIDE_LOCALES_TB.
CREATE OR REPLACE PROCEDURE FIDE_LOCALES_CREATE_SP (
    P_FIDE_LOCALES_V_Id_local_PK IN NUMBER,
    P_Nom_local IN VARCHAR2,
    P_Tel_local IN VARCHAR2,
    P_Direccion_local IN VARCHAR2,
    P_FIDE_LOCALES_V_Id_estado_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_LOCALES_TB (
        FIDE_LOCALES_V_Id_local_PK, V_Nom_local, V_Tel_local, V_Direccion_local, FIDE_LOCALES_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_LOCALES_V_Id_local_PK, P_Nom_local, P_Tel_local, P_Direccion_local, P_FIDE_LOCALES_V_Id_estado_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un local específico en la tabla FIDE_LOCALES_TB.
CREATE OR REPLACE PROCEDURE FIDE_LOCALES_READ_SP (
    P_FIDE_LOCALES_V_Id_local_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_LOCALES_TB
    WHERE FIDE_LOCALES_V_Id_local_PK = P_FIDE_LOCALES_V_Id_local_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un local existente en la tabla FIDE_LOCALES_TB.
CREATE OR REPLACE PROCEDURE FIDE_LOCALES_UPDATE_SP (
    P_FIDE_LOCALES_V_Id_local_PK IN NUMBER,
    P_Nom_local IN VARCHAR2,
    P_Tel_local IN VARCHAR2,
    P_Direccion_local IN VARCHAR2,
    P_FIDE_LOCALES_V_Id_estado_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_LOCALES_TB
    SET V_Nom_local = P_Nom_local,
        V_Tel_local = P_Tel_local,
        V_Direccion_local = P_Direccion_local,
        FIDE_LOCALES_V_Id_estado_FK = P_FIDE_LOCALES_V_Id_estado_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_LOCALES_V_Id_local_PK = P_FIDE_LOCALES_V_Id_local_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un local específico de la tabla FIDE_LOCALES_TB.
CREATE OR REPLACE PROCEDURE FIDE_LOCALES_DELETE_SP (
    P_FIDE_LOCALES_V_Id_local_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_LOCALES_TB
    WHERE FIDE_LOCALES_V_Id_local_PK = P_FIDE_LOCALES_V_Id_local_PK;
END;
/

--Procedimientos CRUD para FIDE_CLIENTES_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo cliente en la tabla FIDE_CLIENTES_TB.
CREATE OR REPLACE PROCEDURE FIDE_CLIENTES_CREATE_SP (
    P_FIDE_CLIENTES_V_Id_cliente_PK IN NUMBER,
    P_Nom_cliente IN VARCHAR2,
    P_Ape_cliente IN VARCHAR2,
    P_Correo_cliente IN VARCHAR2,
    P_Tel_cliente IN VARCHAR2,
    P_Direccion_cliente IN VARCHAR2,
    P_FIDE_CLIENTES_V_Id_estado_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_CLIENTES_TB (
        FIDE_CLIENTES_V_Id_cliente_PK, V_Nom_cliente, V_Ape_cliente, V_Correo_cliente, V_Tel_cliente, V_Direccion_cliente, FIDE_CLIENTES_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_CLIENTES_V_Id_cliente_PK, P_Nom_cliente, P_Ape_cliente, P_Correo_cliente, P_Tel_cliente, P_Direccion_cliente, P_FIDE_CLIENTES_V_Id_estado_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un cliente específico en la tabla FIDE_CLIENTES_TB.
CREATE OR REPLACE PROCEDURE FIDE_CLIENTES_READ_SP (
    P_FIDE_CLIENTES_V_Id_cliente_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_CLIENTES_TB
    WHERE FIDE_CLIENTES_V_Id_cliente_PK = P_FIDE_CLIENTES_V_Id_cliente_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un cliente existente en la tabla FIDE_CLIENTES_TB.
CREATE OR REPLACE PROCEDURE FIDE_CLIENTES_UPDATE_SP (
    P_FIDE_CLIENTES_V_Id_cliente_PK IN NUMBER,
    P_Nom_cliente IN VARCHAR2,
    P_Ape_cliente IN VARCHAR2,
    P_Correo_cliente IN VARCHAR2,
    P_Tel_cliente IN VARCHAR2,
    P_Direccion_cliente IN VARCHAR2,
    P_FIDE_CLIENTES_V_Id_estado_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_CLIENTES_TB
    SET V_Nom_cliente = P_Nom_cliente,
        V_Ape_cliente = P_Ape_cliente,
        V_Correo_cliente = P_Correo_cliente,
        V_Tel_cliente = P_Tel_cliente,
        V_Direccion_cliente = P_Direccion_cliente,
        FIDE_CLIENTES_V_Id_estado_FK = P_FIDE_CLIENTES_V_Id_estado_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_CLIENTES_V_Id_cliente_PK = P_FIDE_CLIENTES_V_Id_cliente_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un cliente específico de la tabla FIDE_CLIENTES_TB.
CREATE OR REPLACE PROCEDURE FIDE_CLIENTES_DELETE_SP (
    P_FIDE_CLIENTES_V_Id_cliente_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_CLIENTES_TB
    WHERE FIDE_CLIENTES_V_Id_cliente_PK = P_FIDE_CLIENTES_V_Id_cliente_PK;
END;
/

--Procedimientos CRUD para FIDE_PRODUCTOS_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo producto en la tabla FIDE_PRODUCTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_PRODUCTOS_CREATE_SP (
    P_FIDE_PRODUCTOS_V_Id_producto_PK IN NUMBER,
    P_Nom_producto IN VARCHAR2,
    P_Piezas_producto IN NUMBER,
    P_Precio_producto IN NUMBER,
    P_Cantidad_producto IN NUMBER,
    P_Descripcion_producto IN VARCHAR2,
    P_FIDE_PRODUCTOS_V_Id_estado_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PRODUCTOS_TB (
        FIDE_PRODUCTOS_V_Id_producto_PK, V_Nom_producto, V_Piezas_producto, V_Precio_producto, V_Cantidad_producto, V_Descripcion_producto, FIDE_PRODUCTOS_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_PRODUCTOS_V_Id_producto_PK, P_Nom_producto, P_Piezas_producto, P_Precio_producto, P_Cantidad_producto, P_Descripcion_producto, P_FIDE_PRODUCTOS_V_Id_estado_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un producto específico en la tabla FIDE_PRODUCTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_PRODUCTOS_READ_SP (
    P_FIDE_PRODUCTOS_V_Id_producto_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_PRODUCTOS_TB
    WHERE FIDE_PRODUCTOS_V_Id_producto_PK = P_FIDE_PRODUCTOS_V_Id_producto_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un producto existente en la tabla FIDE_PRODUCTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_PRODUCTOS_UPDATE_SP (
    P_FIDE_PRODUCTOS_V_Id_producto_PK IN NUMBER,
    P_Nom_producto IN VARCHAR2,
    P_Piezas_producto IN NUMBER,
    P_Precio_producto IN NUMBER,
    P_Cantidad_producto IN NUMBER,
    P_Descripcion_producto IN VARCHAR2,
    P_FIDE_PRODUCTOS_V_Id_estado_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_PRODUCTOS_TB
    SET V_Nom_producto = P_Nom_producto,
        V_Piezas_producto = P_Piezas_producto,
        V_Precio_producto = P_Precio_producto,
        V_Cantidad_producto = P_Cantidad_producto,
        V_Descripcion_producto = P_Descripcion_producto,
        FIDE_PRODUCTOS_V_Id_estado_FK = P_FIDE_PRODUCTOS_V_Id_estado_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_PRODUCTOS_V_Id_producto_PK = P_FIDE_PRODUCTOS_V_Id_producto_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un producto específico de la tabla FIDE_PRODUCTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_PRODUCTOS_DELETE_SP (
    P_FIDE_PRODUCTOS_V_Id_producto_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_PRODUCTOS_TB
    WHERE FIDE_PRODUCTOS_V_Id_producto_PK = P_FIDE_PRODUCTOS_V_Id_producto_PK;
END;
/

--Procedimientos CRUD para FIDE_PROVEEDORES_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo proveedor en la tabla FIDE_PROVEEDORES_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_CREATE_SP (
    P_FIDE_PROVEEDORES_V_Id_proveedor_PK IN NUMBER,
    P_Nom_provedor IN VARCHAR2,
    P_Correo_proveedor IN VARCHAR2,
    P_Producto_proveedor IN VARCHAR2,
    P_Tel_proveedor IN VARCHAR2,
    P_Direccion_proveedor IN VARCHAR2,
    P_FIDE_PROVEEDORES_V_Id_estado_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PROVEEDORES_TB (
        FIDE_PROVEEDORES_V_Id_proveedor_PK, V_Nom_provedor, V_Correo_proveedor, V_Producto_proveedor, V_Tel_proveedor, V_Direccion_proveedor, FIDE_PROVEEDORES_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_PROVEEDORES_V_Id_proveedor_PK, P_Nom_provedor, P_Correo_proveedor, P_Producto_proveedor, P_Tel_proveedor, P_Direccion_proveedor, P_FIDE_PROVEEDORES_V_Id_estado_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un proveedor específico en la tabla FIDE_PROVEEDORES_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_READ_SP (
    P_FIDE_PROVEEDORES_V_Id_proveedor_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_PROVEEDORES_TB
    WHERE FIDE_PROVEEDORES_V_Id_proveedor_PK = P_FIDE_PROVEEDORES_V_Id_proveedor_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un proveedor existente en la tabla FIDE_PROVEEDORES_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_UPDATE_SP (
    P_FIDE_PROVEEDORES_V_Id_proveedor_PK IN NUMBER,
    P_Nom_provedor IN VARCHAR2,
    P_Correo_proveedor IN VARCHAR2,
    P_Producto_proveedor IN VARCHAR2,
    P_Tel_proveedor IN VARCHAR2,
    P_Direccion_proveedor IN VARCHAR2,
    P_FIDE_PROVEEDORES_V_Id_estado_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_PROVEEDORES_TB
    SET V_Nom_provedor = P_Nom_provedor,
        V_Correo_proveedor = P_Correo_proveedor,
        V_Producto_proveedor = P_Producto_proveedor,
        V_Tel_proveedor = P_Tel_proveedor,
        V_Direccion_proveedor = P_Direccion_proveedor,
        FIDE_PROVEEDORES_V_Id_estado_FK = P_FIDE_PROVEEDORES_V_Id_estado_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_PROVEEDORES_V_Id_proveedor_PK = P_FIDE_PROVEEDORES_V_Id_proveedor_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un proveedor específico de la tabla FIDE_PROVEEDORES_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_DELETE_SP (
    P_FIDE_PROVEEDORES_V_Id_proveedor_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_PROVEEDORES_TB
    WHERE FIDE_PROVEEDORES_V_Id_proveedor_PK = P_FIDE_PROVEEDORES_V_Id_proveedor_PK;
END;
/

--Procedimientos CRUD para FIDE_CATALOGO_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo catálogo en la tabla FIDE_CATALOGO_TB.
CREATE OR REPLACE PROCEDURE FIDE_CATALOGO_CREATE_SP (
    P_FIDE_CATALOGO_V_Id_producto_PK IN NUMBER,
    P_Nom_producto IN VARCHAR2,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_CATALOGO_TB (
        FIDE_CATALOGO_V_Id_producto_PK, V_Nom_producto, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_CATALOGO_V_Id_producto_PK, P_Nom_producto, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un catálogo específico en la tabla FIDE_CATALOGO_TB.
CREATE OR REPLACE PROCEDURE FIDE_CATALOGO_READ_SP (
    P_FIDE_CATALOGO_V_Id_producto_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_CATALOGO_TB
    WHERE FIDE_CATALOGO_V_Id_producto_PK = P_FIDE_CATALOGO_V_Id_producto_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un catálogo existente en la tabla FIDE_CATALOGO_TB.
CREATE OR REPLACE PROCEDURE FIDE_CATALOGO_UPDATE_SP (
    P_FIDE_CATALOGO_V_Id_producto_PK IN NUMBER,
    P_Nom_producto IN VARCHAR2,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_CATALOGO_TB
    SET V_Nom_producto = P_Nom_producto,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_CATALOGO_V_Id_producto_PK = P_FIDE_CATALOGO_V_Id_producto_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un catálogo específico de la tabla FIDE_CATALOGO_TB.
CREATE OR REPLACE PROCEDURE FIDE_CATALOGO_DELETE_SP (
    P_FIDE_CATALOGO_V_Id_producto_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_CATALOGO_TB
    WHERE FIDE_CATALOGO_V_Id_producto_PK = P_FIDE_CATALOGO_V_Id_producto_PK;
END;
/

--Procedimientos CRUD para FIDE_TIPO_DESCUENTO_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo tipo de descuento en la tabla FIDE_TIPO_DESCUENTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_TIPO_DESCUENTO_CREATE_SP (
    P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK IN NUMBER,
    P_FIDE_TIPO_DESCUENTO_V_Id_cliente_FK IN NUMBER,
    P_FIDE_TIPO_DESCUENTO_V_Id_estado_FK IN NUMBER,
    P_Porcentaje_descuento IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_TIPO_DESCUENTO_TB (
        FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK, FIDE_TIPO_DESCUENTO_V_Id_cliente_FK, FIDE_TIPO_DESCUENTO_V_Id_estado_FK, V_Porcentaje_descuento, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK, P_FIDE_TIPO_DESCUENTO_V_Id_cliente_FK, P_FIDE_TIPO_DESCUENTO_V_Id_estado_FK, P_Porcentaje_descuento, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un tipo de descuento específico en la tabla FIDE_TIPO_DESCUENTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_TIPO_DESCUENTO_READ_SP (
    P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_TIPO_DESCUENTO_TB
    WHERE FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK = P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un tipo de descuento existente en la tabla FIDE_TIPO_DESCUENTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_TIPO_DESCUENTO_UPDATE_SP (
    P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK IN NUMBER,
    P_FIDE_TIPO_DESCUENTO_V_Id_cliente_FK IN NUMBER,
    P_FIDE_TIPO_DESCUENTO_V_Id_estado_FK IN NUMBER,
    P_Porcentaje_descuento IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_TIPO_DESCUENTO_TB
    SET FIDE_TIPO_DESCUENTO_V_Id_cliente_FK = P_FIDE_TIPO_DESCUENTO_V_Id_cliente_FK,
        FIDE_TIPO_DESCUENTO_V_Id_estado_FK = P_FIDE_TIPO_DESCUENTO_V_Id_estado_FK,
        V_Porcentaje_descuento = P_Porcentaje_descuento,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK = P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un tipo de descuento específico de la tabla FIDE_TIPO_DESCUENTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_TIPO_DESCUENTO_DELETE_SP (
    P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_TIPO_DESCUENTO_TB
    WHERE FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK = P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK;
END;
/

--Procedimientos CRUD para FIDE_ESTADO_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo estado en la tabla FIDE_ESTADO_TB.
CREATE OR REPLACE PROCEDURE FIDE_ESTADO_CREATE_SP (
    P_FIDE_ESTADO_V_Id_estado_PK IN NUMBER,
    P_Tipo IN VARCHAR2,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_ESTADO_TB (
        FIDE_ESTADO_V_Id_estado_PK, V_Tipo, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_ESTADO_V_Id_estado_PK, P_Tipo, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un estado específico en la tabla FIDE_ESTADO_TB.
CREATE OR REPLACE PROCEDURE FIDE_ESTADO_READ_SP (
    P_FIDE_ESTADO_V_Id_estado_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_ESTADO_TB
    WHERE FIDE_ESTADO_V_Id_estado_PK = P_FIDE_ESTADO_V_Id_estado_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un estado existente en la tabla FIDE_ESTADO_TB.
CREATE OR REPLACE PROCEDURE FIDE_ESTADO_UPDATE_SP (
    P_FIDE_ESTADO_V_Id_estado_PK IN NUMBER,
    P_Tipo IN VARCHAR2,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_ESTADO_TB
    SET V_Tipo = P_Tipo,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_ESTADO_V_Id_estado_PK = P_FIDE_ESTADO_V_Id_estado_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un estado específico de la tabla FIDE_ESTADO_TB.
CREATE OR REPLACE PROCEDURE FIDE_ESTADO_DELETE_SP (
    P_FIDE_ESTADO_V_Id_estado_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_ESTADO_TB
    WHERE FIDE_ESTADO_V_Id_estado_PK = P_FIDE_ESTADO_V_Id_estado_PK;
END;
/
--Procedimientos CRUD para FIDE_DESCUENTOS_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo descuento en la tabla FIDE_DESCUENTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_DESCUENTOS_CREATE_SP (
    P_FIDE_DESCUENTOS_V_Id_descuento_PK IN NUMBER,
    P_FIDE_DESCUENTOS_V_Id_cliente_FK IN NUMBER,
    P_FIDE_DESCUENTOS_V_Id_tipo_descuento_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_DESCUENTOS_TB (
        FIDE_DESCUENTOS_V_Id_descuento_PK, FIDE_DESCUENTOS_V_Id_cliente_FK, FIDE_DESCUENTOS_V_Id_tipo_descuento_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_DESCUENTOS_V_Id_descuento_PK, P_FIDE_DESCUENTOS_V_Id_cliente_FK, P_FIDE_DESCUENTOS_V_Id_tipo_descuento_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un descuento específico en la tabla FIDE_DESCUENTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_DESCUENTOS_READ_SP (
    P_FIDE_DESCUENTOS_V_Id_descuento_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_DESCUENTOS_TB
    WHERE FIDE_DESCUENTOS_V_Id_descuento_PK = P_FIDE_DESCUENTOS_V_Id_descuento_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un descuento existente en la tabla FIDE_DESCUENTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_DESCUENTOS_UPDATE_SP (
    P_FIDE_DESCUENTOS_V_Id_descuento_PK IN NUMBER,
    P_FIDE_DESCUENTOS_V_Id_cliente_FK IN NUMBER,
    P_FIDE_DESCUENTOS_V_Id_tipo_descuento_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_DESCUENTOS_TB
    SET FIDE_DESCUENTOS_V_Id_cliente_FK = P_FIDE_DESCUENTOS_V_Id_cliente_FK,
        FIDE_DESCUENTOS_V_Id_tipo_descuento_FK = P_FIDE_DESCUENTOS_V_Id_tipo_descuento_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_DESCUENTOS_V_Id_descuento_PK = P_FIDE_DESCUENTOS_V_Id_descuento_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un descuento específico de la tabla FIDE_DESCUENTOS_TB.
CREATE OR REPLACE PROCEDURE FIDE_DESCUENTOS_DELETE_SP (
    P_FIDE_DESCUENTOS_V_Id_descuento_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_DESCUENTOS_TB
    WHERE FIDE_DESCUENTOS_V_Id_descuento_PK = P_FIDE_DESCUENTOS_V_Id_descuento_PK;
END;
/

--Procedimientos CRUD para FIDE_PROVEEDORES_PRODUCTO_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar un nuevo registro de proveedor-producto en la tabla FIDE_PROVEEDORES_PRODUCTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_PRODUCTO_CREATE_SP (
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK IN NUMBER,
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PROVEEDORES_PRODUCTO_TB (
        FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK, FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK, P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar un registro de proveedor-producto específico en la tabla FIDE_PROVEEDORES_PRODUCTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_PRODUCTO_READ_SP (
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK IN NUMBER,
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_PROVEEDORES_PRODUCTO_TB
    WHERE FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK = P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK
      AND FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK = P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar un registro de proveedor-producto existente en la tabla FIDE_PROVEEDORES_PRODUCTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_PRODUCTO_UPDATE_SP (
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK IN NUMBER,
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_PROVEEDORES_PRODUCTO_TB
    SET V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK = P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK
      AND FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK = P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar un registro de proveedor-producto específico de la tabla FIDE_PROVEEDORES_PRODUCTO_TB.
CREATE OR REPLACE PROCEDURE FIDE_PROVEEDORES_PRODUCTO_DELETE_SP (
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK IN NUMBER,
    P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_PROVEEDORES_PRODUCTO_TB
    WHERE FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK = P_FIDE_PROVEEDORES_PRODUCTO_V_Id_proveedor_FK
      AND FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK = P_FIDE_PROVEEDORES_PRODUCTO_V_Id_producto_FK;
END;
/

--Procedimientos CRUD para  FIDE_FACTURACION_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar una nueva factura en la tabla FIDE_FACTURACION_TB.
CREATE OR REPLACE PROCEDURE FIDE_FACTURACION_CREATE_SP (
    P_FIDE_FACTURACION_V_Id_factura_PK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_producto_FK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_descuento_FK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_cliente_FK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_local_FK IN NUMBER,
    P_Cantidad_producto IN NUMBER,
    P_Precio_Subtotal IN NUMBER,
    P_Precio_Total IN NUMBER,
    P_Fecha_pago IN DATE,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_FACTURACION_TB (
        FIDE_FACTURACION_V_Id_factura_PK, FIDE_FACTURACION_V_Id_producto_FK, FIDE_FACTURACION_V_Id_descuento_FK, FIDE_FACTURACION_V_Id_cliente_FK, FIDE_FACTURACION_V_Id_local_FK, V_Cantidad_producto, V_Precio_Subtotal, V_Precio_Total, V_Fecha_pago, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_FACTURACION_V_Id_factura_PK, P_FIDE_FACTURACION_V_Id_producto_FK, P_FIDE_FACTURACION_V_Id_descuento_FK, P_FIDE_FACTURACION_V_Id_cliente_FK, P_FIDE_FACTURACION_V_Id_local_FK, P_Cantidad_producto, P_Precio_Subtotal, P_Precio_Total, P_Fecha_pago, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar una factura específica en la tabla FIDE_FACTURACION_TB.
CREATE OR REPLACE PROCEDURE FIDE_FACTURACION_READ_SP (
    P_FIDE_FACTURACION_V_Id_factura_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_FACTURACION_TB
    WHERE FIDE_FACTURACION_V_Id_factura_PK = P_FIDE_FACTURACION_V_Id_factura_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar una factura existente en la tabla FIDE_FACTURACION_TB.
CREATE OR REPLACE PROCEDURE FIDE_FACTURACION_UPDATE_SP (
    P_FIDE_FACTURACION_V_Id_factura_PK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_producto_FK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_descuento_FK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_cliente_FK IN NUMBER,
    P_FIDE_FACTURACION_V_Id_local_FK IN NUMBER,
    P_Cantidad_producto IN NUMBER,
    P_Precio_Subtotal IN NUMBER,
    P_Precio_Total IN NUMBER,
    P_Fecha_pago IN DATE,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_FACTURACION_TB
    SET FIDE_FACTURACION_V_Id_producto_FK = P_FIDE_FACTURACION_V_Id_producto_FK,
        FIDE_FACTURACION_V_Id_descuento_FK = P_FIDE_FACTURACION_V_Id_descuento_FK,
        FIDE_FACTURACION_V_Id_cliente_FK = P_FIDE_FACTURACION_V_Id_cliente_FK,
        FIDE_FACTURACION_V_Id_local_FK = P_FIDE_FACTURACION_V_Id_local_FK,
        V_Cantidad_producto = P_Cantidad_producto,
        V_Precio_Subtotal = P_Precio_Subtotal,
        V_Precio_Total = P_Precio_Total,
        V_Fecha_pago = P_Fecha_pago,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_FACTURACION_V_Id_factura_PK = P_FIDE_FACTURACION_V_Id_factura_PK;
END;
/

--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar una factura específica de la tabla FIDE_FACTURACION_TB.
CREATE OR REPLACE PROCEDURE FIDE_FACTURACION_DELETE_SP (
    P_FIDE_FACTURACION_V_Id_factura_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_FACTURACION_TB
    WHERE FIDE_FACTURACION_V_Id_factura_PK = P_FIDE_FACTURACION_V_Id_factura_PK;
END;
/

--Procedimientos CRUD para FIDE_VENTAS_TB

--DESCRIPCIÓN: El siguiente procedimiento se encarga de insertar una nueva venta en la tabla FIDE_VENTAS_TB.
CREATE OR REPLACE PROCEDURE FIDE_VENTAS_CREATE_SP (
    P_FIDE_VENTAS_V_Id_venta_PK IN NUMBER,
    P_FIDE_VENTAS_V_Id_factura_FK IN NUMBER,
    P_FIDE_VENTAS_V_Id_producto_FK IN NUMBER,
    P_FIDE_VENTAS_V_Id_local_FK IN NUMBER,
    P_FIDE_VENTAS_V_Id_entrega_FK IN NUMBER,
    P_Creado_por IN VARCHAR2,
    P_Fecha_de_creacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_VENTAS_TB (
        FIDE_VENTAS_V_Id_venta_PK, FIDE_VENTAS_V_Id_factura_FK, FIDE_VENTAS_V_Id_producto_FK, FIDE_VENTAS_V_Id_local_FK, FIDE_VENTAS_V_Id_entrega_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_VENTAS_V_Id_venta_PK, P_FIDE_VENTAS_V_Id_factura_FK, P_FIDE_VENTAS_V_Id_producto_FK, P_FIDE_VENTAS_V_Id_local_FK, P_FIDE_VENTAS_V_Id_entrega_FK, P_Creado_por, TO_DATE(P_Fecha_de_creacion, 'YYYY-MM-DD'), P_Accion
    );
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de consultar una venta específica en la tabla FIDE_VENTAS_TB.
CREATE OR REPLACE PROCEDURE FIDE_VENTAS_READ_SP (
    P_FIDE_VENTAS_V_Id_venta_PK IN NUMBER,
    P_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN P_result FOR
    SELECT * FROM FIDE_VENTAS_TB
    WHERE FIDE_VENTAS_V_Id_venta_PK = P_FIDE_VENTAS_V_Id_venta_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de actualizar una venta existente en la tabla FIDE_VENTAS_TB.
CREATE OR REPLACE PROCEDURE FIDE_VENTAS_UPDATE_SP (
    P_FIDE_VENTAS_V_Id_venta_PK IN NUMBER,
    P_FIDE_VENTAS_V_Id_factura_FK IN NUMBER,
    P_FIDE_VENTAS_V_Id_producto_FK IN NUMBER,
    P_FIDE_VENTAS_V_Id_local_FK IN NUMBER,
    P_FIDE_VENTAS_V_Id_entrega_FK IN NUMBER,
    P_Modificado_por IN VARCHAR2,
    P_Fecha_de_modificacion IN VARCHAR2,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_VENTAS_TB
    SET FIDE_VENTAS_V_Id_factura_FK = P_FIDE_VENTAS_V_Id_factura_FK,
        FIDE_VENTAS_V_Id_producto_FK = P_FIDE_VENTAS_V_Id_producto_FK,
        FIDE_VENTAS_V_Id_local_FK = P_FIDE_VENTAS_V_Id_local_FK,
        FIDE_VENTAS_V_Id_entrega_FK = P_FIDE_VENTAS_V_Id_entrega_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = TO_DATE(P_Fecha_de_modificacion, 'YYYY-MM-DD'),
        V_Accion = P_Accion
    WHERE FIDE_VENTAS_V_Id_venta_PK = P_FIDE_VENTAS_V_Id_venta_PK;
END;
/
--DESCRIPCIÓN: El siguiente procedimiento se encarga de eliminar una venta específica de la tabla FIDE_VENTAS_TB.
CREATE OR REPLACE PROCEDURE FIDE_VENTAS_DELETE_SP (
    P_FIDE_VENTAS_V_Id_venta_PK IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_VENTAS_TB
    WHERE FIDE_VENTAS_V_Id_venta_PK = P_FIDE_VENTAS_V_Id_venta_PK;
END;
/

-----------------------------------------------FUNCIONES-----------------------------------------------

CREATE OR REPLACE FUNCTION FIDE_PRODUCTOS_OBTENER_PRECIO_FN (
    P_Id_producto NUMBER
) RETURN NUMBER IS
    V_Precio_producto NUMBER;
BEGIN
    SELECT V_Precio_producto
    INTO V_Precio_producto
    FROM FIDE_PRODUCTOS_TB
    WHERE FIDE_PRODUCTOS_V_Id_producto_PK = P_Id_producto;
    
    RETURN V_Precio_producto;
END FIDE_PRODUCTOS_OBTENER_PRECIO_FN;
/
--Funcion que recupera el precio de un producto basado en su ID.

CREATE OR REPLACE FUNCTION FIDE_CLIENTES_OBTENER_CORREO_FN (
    P_Id_cliente NUMBER
) RETURN VARCHAR2 IS
    V_Correo_cliente VARCHAR2(50);
BEGIN
    SELECT V_Correo_cliente
    INTO V_Correo_cliente
    FROM FIDE_CLIENTES_TB
    WHERE FIDE_CLIENTES_V_Id_cliente_PK = P_Id_cliente;
    
    RETURN V_Correo_cliente;
END FIDE_CLIENTES_OBTENER_CORREO_FN;
/
--Funcion que retorna el correo de un cliente basado en su ID.

CREATE OR REPLACE FUNCTION FIDE_DESCUENTOS_CALCULAR_MONTO_FN (
    P_Id_descuento NUMBER,
    P_Subtotal NUMBER
) RETURN NUMBER IS
    V_Porcentaje_descuento NUMBER;
    V_Discount_amount NUMBER;
BEGIN
    SELECT TD.V_Porcentaje_descuento
    INTO V_Porcentaje_descuento
    FROM FIDE_DESCUENTOS_TB D
    JOIN FIDE_TIPO_DESCUENTO_TB TD ON D.FIDE_DESCUENTOS_V_Id_tipo_descuento_FK = TD.FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK
    WHERE D.FIDE_DESCUENTOS_V_Id_descuento_PK = P_Id_descuento;
    
    V_Discount_amount := P_Subtotal * (V_Porcentaje_descuento / 100);
    
    RETURN V_Discount_amount;
END FIDE_DESCUENTOS_CALCULAR_MONTO_FN;
/
--Calcular el monto de descuento basado en el ID Descuento y el subtotal

CREATE OR REPLACE FUNCTION FIDE_PRODUCTOS_CHECK_DISPONIBILIDAD_FN (
    P_Id_producto NUMBER
) RETURN VARCHAR2 IS
    V_Cantidad_producto NUMBER;
BEGIN
    SELECT V_Cantidad_producto
    INTO V_Cantidad_producto
    FROM FIDE_PRODUCTOS_TB
    WHERE FIDE_PRODUCTOS_V_Id_producto_PK = P_Id_producto;
    
    IF V_Cantidad_producto > 0 THEN
        RETURN 'Available';
    ELSE
        RETURN 'Out of Stock';
    END IF;
END FIDE_PRODUCTOS_CHECK_DISPONIBILIDAD_FN;
/
--Funcion que retorna la disponibilidad de stock de un producto

CREATE OR REPLACE FUNCTION FIDE_PROVEEDORES_OBTENER_CONTACTO_FN (
    P_Id_proveedor NUMBER
) RETURN VARCHAR2 IS
    V_Contact_info VARCHAR2(100);
BEGIN
    SELECT V_Correo_proveedor || ' | ' || V_Tel_proveedor
    INTO V_Contact_info
    FROM FIDE_PROVEEDORES_TB
    WHERE FIDE_PROVEEDORES_V_Id_proveedor_PK = P_Id_proveedor;
    
    RETURN V_Contact_info;
END FIDE_PROVEEDORES_OBTENER_CONTACTO_FN;
/
--Funcion que retorna un string concatenado del correo y numero de telefono del provedor 

CREATE OR REPLACE FUNCTION FIDE_CLIENTES_OBTENER_PORCENTAJE_DESCUENTO_FN (
    P_Id_cliente NUMBER
) RETURN NUMBER IS
    V_Porcentaje_descuento NUMBER;
BEGIN
    SELECT V_Porcentaje_descuento
    INTO V_Porcentaje_descuento
    FROM FIDE_TIPO_DESCUENTO_TB
    WHERE FIDE_TIPO_DESCUENTO_V_Id_cliente_FK = P_Id_cliente;
    
    RETURN V_Porcentaje_descuento;
END FIDE_CLIENTES_OBTENER_PORCENTAJE_DESCUENTO_FN;
/
--Funcion que retorna el porcentaje de descuento 

CREATE OR REPLACE FUNCTION FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN (
    P_Id_cliente NUMBER
) RETURN NUMBER IS
    V_Total_orders NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO V_Total_orders
    FROM FIDE_VENTAS_TB V
    JOIN FIDE_FACTURACION_TB F ON V.FIDE_VENTAS_V_Id_factura_FK = F.FIDE_FACTURACION_V_Id_factura_PK
    WHERE F.FIDE_FACTURACION_V_Id_cliente_FK = P_Id_cliente;
    
    RETURN V_Total_orders;
END FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN;
/

--Funcion que retorna total de ordenes puestas por un 1 cliente.

CREATE OR REPLACE FUNCTION FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN (
    P_Id_producto NUMBER
) RETURN NUMBER IS
    V_Total_sales NUMBER;
BEGIN
    SELECT SUM(F.V_Cantidad_producto)
    INTO V_Total_sales
    FROM FIDE_FACTURACION_TB F
    JOIN FIDE_VENTAS_TB V ON F.FIDE_FACTURACION_V_Id_factura_PK = V.FIDE_VENTAS_V_Id_factura_FK
    WHERE V.FIDE_VENTAS_V_Id_producto_FK = P_Id_producto;
    
    RETURN V_Total_sales;
END FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN;
/
--Funcion que retorna el total de ventas de un producto

-----------------------------------------------CURSORES-----------------------------------------------
-- DESCRIPCIÓN: El siguiente cursor se encarga de obtener los detalles del inventario de productos.
SET SERVEROUTPUT ON;
/
DECLARE
    CURSOR cursor_inventario IS
        SELECT FIDE_PRODUCTOS_V_Id_producto_PK, V_Nom_producto, V_Cantidad_producto
        FROM FIDE_PRODUCTOS_TB;
    V_Id_producto FIDE_PRODUCTOS_TB.FIDE_PRODUCTOS_V_Id_producto_PK%TYPE;
    V_Nom_producto FIDE_PRODUCTOS_TB.V_Nom_producto%TYPE;
    V_Cantidad_producto FIDE_PRODUCTOS_TB.V_Cantidad_producto%TYPE;
BEGIN
    OPEN cursor_inventario;
    LOOP
        FETCH cursor_inventario INTO V_Id_producto, V_Nom_producto, V_Cantidad_producto;
        EXIT WHEN cursor_inventario%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Producto: ' || V_Id_producto || ', Nombre: ' || V_Nom_producto || ', Cantidad: ' || V_Cantidad_producto);
    END LOOP;
    CLOSE cursor_inventario;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de recuperar los detalles de las órdenes de los clientes.
DECLARE
    CURSOR cursor_ordenes IS
        SELECT FIDE_FACTURACION_V_Id_factura_PK, FIDE_FACTURACION_V_Id_cliente_FK, V_Precio_Total
        FROM FIDE_FACTURACION_TB;
    V_Id_factura FIDE_FACTURACION_TB.FIDE_FACTURACION_V_Id_factura_PK%TYPE;
    V_Id_cliente FIDE_FACTURACION_TB.FIDE_FACTURACION_V_Id_cliente_FK%TYPE;
    V_Precio_Total FIDE_FACTURACION_TB.V_Precio_Total%TYPE;
BEGIN
    OPEN cursor_ordenes;
    LOOP
        FETCH cursor_ordenes INTO V_Id_factura, V_Id_cliente, V_Precio_Total;
        EXIT WHEN cursor_ordenes%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID de la Factura: ' || V_Id_factura || ', ID del Cliente: ' || V_Id_cliente || ', Precio Total: ' || V_Precio_Total);
    END LOOP;
    CLOSE cursor_ordenes;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de obtener los detalles de los proveedores.
DECLARE
    CURSOR cursor_proveedores IS
        SELECT FIDE_PROVEEDORES_V_Id_proveedor_PK, V_Nom_provedor, V_Producto_proveedor
        FROM FIDE_PROVEEDORES_TB;
    V_Id_proveedor FIDE_PROVEEDORES_TB.FIDE_PROVEEDORES_V_Id_proveedor_PK%TYPE;
    V_Nom_provedor FIDE_PROVEEDORES_TB.V_Nom_provedor%TYPE;
    V_Producto_proveedor FIDE_PROVEEDORES_TB.V_Producto_proveedor%TYPE;
BEGIN
    OPEN cursor_proveedores;
    LOOP
        FETCH cursor_proveedores INTO V_Id_proveedor, V_Nom_provedor, V_Producto_proveedor;
        EXIT WHEN cursor_proveedores%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Proveedor: ' || V_Id_proveedor || ', Nombre: ' || V_Nom_provedor || ', Producto: ' || V_Producto_proveedor);
    END LOOP;
    CLOSE cursor_proveedores;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de recuperar los detalles de los descuentos por tipo.
DECLARE
    CURSOR cursor_descuentos IS
        SELECT FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK, FIDE_TIPO_DESCUENTO_V_Id_cliente_FK, V_Porcentaje_descuento
        FROM FIDE_TIPO_DESCUENTO_TB;
    V_Id_tipo_descuento FIDE_TIPO_DESCUENTO_TB.FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK%TYPE;
    V_Id_cliente FIDE_TIPO_DESCUENTO_TB.FIDE_TIPO_DESCUENTO_V_Id_cliente_FK%TYPE;
    V_Porcentaje_descuento FIDE_TIPO_DESCUENTO_TB.V_Porcentaje_descuento%TYPE;
BEGIN
    OPEN cursor_descuentos;
    LOOP
        FETCH cursor_descuentos INTO V_Id_tipo_descuento, V_Id_cliente, V_Porcentaje_descuento;
        EXIT WHEN cursor_descuentos%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Tipo de Descuento: ' || V_Id_tipo_descuento || ', ID del Cliente: ' || V_Id_cliente || ', Porcentaje: ' || V_Porcentaje_descuento || '%');
    END LOOP;
    CLOSE cursor_descuentos;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de recuperar la información sobre las tiendas.
DECLARE
    CURSOR cursor_tiendas IS
        SELECT FIDE_LOCALES_V_Id_local_PK, V_Nom_local, V_Tel_local, V_Direccion_local
        FROM FIDE_LOCALES_TB;
    V_Id_local FIDE_LOCALES_TB.FIDE_LOCALES_V_Id_local_PK%TYPE;
    V_Nom_local FIDE_LOCALES_TB.V_Nom_local%TYPE;
    V_Tel_local FIDE_LOCALES_TB.V_Tel_local%TYPE;
    V_Direccion_local FIDE_LOCALES_TB.V_Direccion_local%TYPE;
BEGIN
    OPEN cursor_tiendas;
    LOOP
        FETCH cursor_tiendas INTO V_Id_local, V_Nom_local, V_Tel_local, V_Direccion_local;
        EXIT WHEN cursor_tiendas%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID de la Tienda: ' || V_Id_local || ', Nombre: ' || V_Nom_local || ', Teléfono: ' || V_Tel_local || ', Dirección: ' || V_Direccion_local);
    END LOOP;
    CLOSE cursor_tiendas;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de listar los productos en el catálogo.
DECLARE
    CURSOR cursor_catalogo IS
        SELECT FIDE_CATALOGO_V_Id_producto_PK, V_Nom_producto, V_Precio_producto
        FROM FIDE_CATALOGO_TB;
    V_Id_producto FIDE_CATALOGO_TB.FIDE_CATALOGO_V_Id_producto_PK%TYPE;
    V_Nom_producto FIDE_CATALOGO_TB.V_Nom_producto%TYPE;
    V_Precio_producto FIDE_CATALOGO_TB.V_Precio_producto%TYPE;
BEGIN
    OPEN cursor_catalogo;
    LOOP
        FETCH cursor_catalogo INTO V_Id_producto, V_Nom_producto, V_Precio_producto;
        EXIT WHEN cursor_catalogo%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Producto: ' || V_Id_producto || ', Nombre: ' || V_Nom_producto || ', Precio: ' || V_Precio_producto);
    END LOOP;
    CLOSE cursor_catalogo;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de recuperar los detalles de los clientes.
DECLARE
    CURSOR cursor_clientes IS
        SELECT FIDE_CLIENTES_V_Id_cliente_PK, V_Nom_cliente, V_Ape_cliente
        FROM FIDE_CLIENTES_TB;
    V_Id_cliente FIDE_CLIENTES_TB.FIDE_CLIENTES_V_Id_cliente_PK%TYPE;
    V_Nom_cliente FIDE_CLIENTES_TB.V_Nom_cliente%TYPE;
    V_Ape_cliente FIDE_CLIENTES_TB.V_Ape_cliente%TYPE;
BEGIN
    OPEN cursor_clientes;
    LOOP
        FETCH cursor_clientes INTO V_Id_cliente, V_Nom_cliente, V_Ape_cliente;
        EXIT WHEN cursor_clientes%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Cliente: ' || V_Id_cliente || ', Nombre: ' || V_Nom_cliente || ' ' || V_Ape_cliente);
    END LOOP;
    CLOSE cursor_clientes;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de obtener los detalles de las órdenes y sus pagos.
DECLARE
    CURSOR cursor_ordenes_pagos IS
        SELECT FIDE_FACTURACION_V_Id_factura_PK, FIDE_FACTURACION_V_Id_cliente_FK, V_Precio_Total
        FROM FIDE_FACTURACION_TB;
    V_Id_factura FIDE_FACTURACION_TB.FIDE_FACTURACION_V_Id_factura_PK%TYPE;
    V_Id_cliente FIDE_FACTURACION_TB.FIDE_FACTURACION_V_Id_cliente_FK%TYPE;
    V_Precio_Total FIDE_FACTURACION_TB.V_Precio_Total%TYPE;
BEGIN
    OPEN cursor_ordenes_pagos;
    LOOP
        FETCH cursor_ordenes_pagos INTO V_Id_factura, V_Id_cliente, V_Precio_Total;
        EXIT WHEN cursor_ordenes_pagos%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Pedido: ' || V_Id_factura || ', ID del Cliente: ' || V_Id_cliente || ', Precio Total: ' || V_Precio_Total);
    END LOOP;
    CLOSE cursor_ordenes_pagos;
END;
/
-- DESCRIPCIÓN: El siguiente cursor se encarga de rastrear las entregas realizadas por los proveedores.
DECLARE
    CURSOR cursor_entregas_proveedores IS
        SELECT FIDE_PROVEEDORES_V_Id_proveedor_PK, V_Nom_provedor, V_Producto_proveedor
        FROM FIDE_PROVEEDORES_TB;
    V_Id_proveedor FIDE_PROVEEDORES_TB.FIDE_PROVEEDORES_V_Id_proveedor_PK%TYPE;
    V_Nom_provedor FIDE_PROVEEDORES_TB.V_Nom_provedor%TYPE;
    V_Producto_proveedor FIDE_PROVEEDORES_TB.V_Producto_proveedor%TYPE;
BEGIN
    OPEN cursor_entregas_proveedores;
    LOOP
        FETCH cursor_entregas_proveedores INTO V_Id_proveedor, V_Nom_provedor, V_Producto_proveedor;
        EXIT WHEN cursor_entregas_proveedores%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID del Proveedor: ' || V_Id_proveedor || ', Nombre: ' || V_Nom_provedor || ', Producto: ' || V_Producto_proveedor);
    END LOOP;
    CLOSE cursor_entregas_proveedores;
END;
/

-----------------------------------------------VISTAS-----------------------------------------------
-- Vista que muestra la información de los clientes junto con sus descuentos y entregas
CREATE VIEW FIDE_CLIENTES_DESCUENTOS_ENTREGAS_V AS
SELECT 
    c.FIDE_CLIENTES_V_ID_CLIENTE_PK,
    c.V_NOM_CLIENTE,
    c.V_APE_CLIENTE,
    c.V_CORREO_CLIENTE,
    d.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK,
    d.FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK,
    e.FIDE_ENTREGAS_V_ID_ENTREGA_PK,
    e.V_DIRECCION_CLIENTE
FROM 
    FIDE_CLIENTES_TB c
LEFT JOIN 
    FIDE_DESCUENTOS_TB d ON c.FIDE_CLIENTES_V_ID_CLIENTE_PK = d.FIDE_DESCUENTOS_V_ID_CLIENTE_FK
LEFT JOIN 
    FIDE_ENTREGAS_TB e ON c.FIDE_CLIENTES_V_ID_CLIENTE_PK = e.FIDE_ENTREGAS_V_ID_CLIENTE_FK;

-- Vista que muestra la información de los productos junto con sus proveedores
-- **POR HACER: Se debe corregir el nombre de la columna V_NOM_PROVEDOR a V_NOM_PROVEEDOR en la tabla FIDE_PROVEEDORES_TB!**
CREATE VIEW FIDE_PRODUCTOS_PROVEEDORES_V AS 
SELECT 
    p.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK,
    p.V_NOM_PRODUCTO,
    p.V_PRECIO_PRODUCTO,
    pr.FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK,
    pr.V_NOM_PROVEDOR,
    pr.V_CORREO_PROVEEDOR
FROM 
    FIDE_PRODUCTOS_TB p
LEFT JOIN 
    FIDE_PROVEEDORES_PRODUCTO_TB pp ON p.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK = pp.FIDE_PROVEEDORES_PRODUCTO_V_ID_PRODUCTO_FK
LEFT JOIN 
    FIDE_PROVEEDORES_TB pr ON pp.FIDE_PROVEEDORES_PRODUCTO_V_ID_PROVEEDOR_FK = pr.FIDE_PROVEEDORES_V_ID_PROVEEDOR_PK;

-- Vista que muestra la información de los locales junto con los productos disponibles en ellos
CREATE VIEW FIDE_LOCALES_PRODUCTOS_V AS
SELECT 
    l.FIDE_LOCALES_V_ID_LOCAL_PK,
    l.V_NOM_LOCAL,
    l.V_DIRECCION_LOCAL,
    p.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK,
    p.V_NOM_PRODUCTO,
    p.V_CANTIDAD_PRODUCTO
FROM 
    FIDE_LOCALES_TB l
LEFT JOIN 
    FIDE_PRODUCTOS_TB p ON l.FIDE_LOCALES_V_ID_LOCAL_PK = p.FIDE_PRODUCTOS_V_ID_ESTADO_FK;

-- Vista que muestra los tipos de descuentos junto con los clientes que los tienen
CREATE VIEW FIDE_TIPO_DESCUENTOS_CLIENTES_V AS
SELECT 
    td.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK,
    td.V_PORCENTAJE_DESCUENTO,
    d.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK,
    d.FIDE_DESCUENTOS_V_ID_CLIENTE_FK,
    c.V_NOM_CLIENTE
FROM 
    FIDE_TIPO_DESCUENTO_TB td
LEFT JOIN 
    FIDE_DESCUENTOS_TB d ON td.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK = d.FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK
LEFT JOIN 
    FIDE_CLIENTES_TB c ON d.FIDE_DESCUENTOS_V_ID_CLIENTE_FK = c.FIDE_CLIENTES_V_ID_CLIENTE_PK;

-- Vista que muestra la información de las entregas junto con los clientes y su información de contacto
CREATE VIEW FIDE_ENTREGAS_CLIENTES_CONTACTO_V AS
SELECT 
    e.FIDE_ENTREGAS_V_ID_ENTREGA_PK,
    c.V_NOM_CLIENTE,
    e.V_DIRECCION_CLIENTE,
    e.V_TEL_CLIENTE,
    c.V_CORREO_CLIENTE
FROM 
    FIDE_ENTREGAS_TB e
LEFT JOIN 
    FIDE_CLIENTES_TB c ON e.FIDE_ENTREGAS_V_ID_CLIENTE_FK = c.FIDE_CLIENTES_V_ID_CLIENTE_PK;

