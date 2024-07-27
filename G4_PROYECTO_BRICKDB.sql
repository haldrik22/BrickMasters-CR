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
    P_Fecha_de_creacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_LOCALES_TB (
        FIDE_LOCALES_V_Id_local_PK, V_Nom_local, V_Tel_local, V_Direccion_local, FIDE_LOCALES_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_LOCALES_V_Id_local_PK, P_Nom_local, P_Tel_local, P_Direccion_local, P_FIDE_LOCALES_V_Id_estado_FK, P_Creado_por, P_Fecha_de_creacion, P_Accion
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
    P_Fecha_de_modificacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_LOCALES_TB
    SET V_Nom_local = P_Nom_local,
        V_Tel_local = P_Tel_local,
        V_Direccion_local = P_Direccion_local,
        FIDE_LOCALES_V_Id_estado_FK = P_FIDE_LOCALES_V_Id_estado_FK,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = P_Fecha_de_modificacion,
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
    P_Fecha_de_creacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_CLIENTES_TB (
        FIDE_CLIENTES_V_Id_cliente_PK, V_Nom_cliente, V_Ape_cliente, V_Correo_cliente, V_Tel_cliente, V_Direccion_cliente, FIDE_CLIENTES_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_CLIENTES_V_Id_cliente_PK, P_Nom_cliente, P_Ape_cliente, P_Correo_cliente, P_Tel_cliente, P_Direccion_cliente, P_FIDE_CLIENTES_V_Id_estado_FK, P_Creado_por, P_Fecha_de_creacion, P_Accion
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
    P_Fecha_de_modificacion IN DATE,
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
        V_Fecha_de_modificacion = P_Fecha_de_modificacion,
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
    P_Fecha_de_creacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PRODUCTOS_TB (
        FIDE_PRODUCTOS_V_Id_producto_PK, V_Nom_producto, V_Piezas_producto, V_Precio_producto, V_Cantidad_producto, V_Descripcion_producto, FIDE_PRODUCTOS_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_PRODUCTOS_V_Id_producto_PK, P_Nom_producto, P_Piezas_producto, P_Precio_producto, P_Cantidad_producto, P_Descripcion_producto, P_FIDE_PRODUCTOS_V_Id_estado_FK, P_Creado_por, P_Fecha_de_creacion, P_Accion
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
    P_Fecha_de_modificacion IN DATE,
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
        V_Fecha_de_modificacion = P_Fecha_de_modificacion,
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
    P_Fecha_de_creacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PROVEEDORES_TB (
        FIDE_PROVEEDORES_V_Id_proveedor_PK, V_Nom_provedor, V_Correo_proveedor, V_Producto_proveedor, V_Tel_proveedor, V_Direccion_proveedor, FIDE_PROVEEDORES_V_Id_estado_FK, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_PROVEEDORES_V_Id_proveedor_PK, P_Nom_provedor, P_Correo_proveedor, P_Producto_proveedor, P_Tel_proveedor, P_Direccion_proveedor, P_FIDE_PROVEEDORES_V_Id_estado_FK, P_Creado_por, P_Fecha_de_creacion, P_Accion
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
    P_Fecha_de_modificacion IN DATE,
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
        V_Fecha_de_modificacion = P_Fecha_de_modificacion,
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
    P_Fecha_de_creacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_CATALOGO_TB (
        FIDE_CATALOGO_V_Id_producto_PK, V_Nom_producto, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_CATALOGO_V_Id_producto_PK, P_Nom_producto, P_Creado_por, P_Fecha_de_creacion, P_Accion
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
    P_Fecha_de_modificacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_CATALOGO_TB
    SET V_Nom_producto = P_Nom_producto,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = P_Fecha_de_modificacion,
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
    P_Fecha_de_creacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_TIPO_DESCUENTO_TB (
        FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK, FIDE_TIPO_DESCUENTO_V_Id_cliente_FK, FIDE_TIPO_DESCUENTO_V_Id_estado_FK, V_Porcentaje_descuento, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        P_FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK, P_FIDE_TIPO_DESCUENTO_V_Id_cliente_FK, P_FIDE_TIPO_DESCUENTO_V_Id_estado_FK, P_Porcentaje_descuento, P_Creado_por, P_Fecha_de_creacion, P_Accion
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
    P_Fecha_de_modificacion IN DATE,
    P_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_TIPO_DESCUENTO_TB
    SET FIDE_TIPO_DESCUENTO_V_Id_cliente_FK = P_FIDE_TIPO_DESCUENTO_V_Id_cliente_FK,
        FIDE_TIPO_DESCUENTO_V_Id_estado_FK = P_FIDE_TIPO_DESCUENTO_V_Id_estado_FK,
        V_Porcentaje_descuento = P_Porcentaje_descuento,
        V_Modificado_por = P_Modificado_por,
        V_Fecha_de_modificacion = P_Fecha_de_modificacion,
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

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_ESTADO (
    p_V_Id_estado IN NUMBER,
    p_V_Tipo IN VARCHAR2,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_ESTADO_TB (
        V_Id_estado, V_Tipo, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_estado, p_V_Tipo, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_ESTADO (
    p_V_Id_estado IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_ESTADO_TB
    WHERE V_Id_estado = p_V_Id_estado;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_ESTADO (
    p_V_Id_estado IN NUMBER,
    p_V_Tipo IN VARCHAR2,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_ESTADO_TB
    SET V_Tipo = p_V_Tipo,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_estado = p_V_Id_estado;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_ESTADO (
    p_V_Id_estado IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_ESTADO_TB
    WHERE V_Id_estado = p_V_Id_estado;
END;
/

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_DESCUENTO (
    p_V_Id_descuento IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Id_tipo_descuento IN NUMBER,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_DESCUENTOS_TB (
        V_Id_descuento, V_Id_cliente, V_Id_tipo_descuento, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_descuento, p_V_Id_cliente, p_V_Id_tipo_descuento, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_DESCUENTO (
    p_V_Id_descuento IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_DESCUENTOS_TB
    WHERE V_Id_descuento = p_V_Id_descuento;
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_DESCUENTO (
    p_V_Id_descuento IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_DESCUENTOS_TB
    WHERE V_Id_descuento = p_V_Id_descuento;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_DESCUENTO (
    p_V_Id_descuento IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Id_tipo_descuento IN NUMBER,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_DESCUENTOS_TB
    SET V_Id_cliente = p_V_Id_cliente,
        V_Id_tipo_descuento = p_V_Id_tipo_descuento,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_descuento = p_V_Id_descuento;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_DESCUENTO (
    p_V_Id_descuento IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_DESCUENTOS_TB
    WHERE V_Id_descuento = p_V_Id_descuento;
END;
/

--Procedimientos CRUD para FIDE_PROVEEDORES_PRODUCTO_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_PROVEEDORES_PRODUCTO (
    p_V_Id_proveedor IN NUMBER,
    p_V_Id_producto IN NUMBER,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PROVEEDORES_PRODUCTO_TB (
        V_Id_proveedor, V_Id_producto, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_proveedor, p_V_Id_producto, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_PROVEEDORES_PRODUCTO (
    p_V_Id_proveedor IN NUMBER,
    p_V_Id_producto IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_PROVEEDORES_PRODUCTO_TB
    WHERE V_Id_proveedor = p_V_Id_proveedor AND V_Id_producto = p_V_Id_producto;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_PROVEEDORES_PRODUCTO (
    p_V_Id_proveedor IN NUMBER,
    p_V_Id_producto IN NUMBER,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_PROVEEDORES_PRODUCTO_TB
    SET V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_proveedor = p_V_Id_proveedor AND V_Id_producto = p_V_Id_producto;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_PROVEEDORES_PRODUCTO (
    p_V_Id_proveedor IN NUMBER,
    p_V_Id_producto IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_PROVEEDORES_PRODUCTO_TB
    WHERE V_Id_proveedor = p_V_Id_proveedor AND V_Id_producto = p_V_Id_producto;
END;
/


--Procedimientos CRUD para  FIDE_FACTURACION_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_FACTURACION (
    p_V_Id_factura IN NUMBER,
    p_V_Id_producto IN NUMBER,
    p_V_Id_descuento IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Id_local IN VARCHAR2,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Precio_Subtotal IN NUMBER,
    p_V_Precio_Total IN NUMBER,
    p_V_Fecha_pago IN DATE,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_FACTURACION_TB (
        V_Id_factura, V_Id_producto, V_Id_descuento, V_Id_cliente, V_Id_local, V_Cantidad_producto, V_Precio_Subtotal, V_Precio_Total, V_Fecha_pago, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_factura, p_V_Id_producto, p_V_Id_descuento, p_V_Id_cliente, p_V_Id_local, p_V_Cantidad_producto, p_V_Precio_Subtotal, p_V_Precio_Total, p_V_Fecha_pago, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_FACTURACION (
    p_V_Id_factura IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_FACTURACION_TB
    WHERE V_Id_factura = p_V_Id_factura;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_FACTURACION (
    p_V_Id_factura IN NUMBER,
    p_V_Id_producto IN NUMBER,
    p_V_Id_descuento IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Id_local IN VARCHAR2,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Precio_Subtotal IN NUMBER,
    p_V_Precio_Total IN NUMBER,
    p_V_Fecha_pago IN DATE,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_FACTURACION_TB
    SET V_Id_producto = p_V_Id_producto,
        V_Id_descuento = p_V_Id_descuento,
        V_Id_cliente = p_V_Id_cliente,
        V_Id_local = p_V_Id_local,
        V_Cantidad_producto = p_V_Cantidad_producto,
        V_Precio_Subtotal = p_V_Precio_Subtotal,
        V_Precio_Total = p_V_Precio_Total,
        V_Fecha_pago = p_V_Fecha_pago,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_factura = p_V_Id_factura;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_FACTURACION (
    p_V_Id_factura IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_FACTURACION_TB
    WHERE V_Id_factura = p_V_Id_factura;
END;
/

--Procedimientos CRUD para FIDE_VENTAS_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_VENTAS (
    p_V_Id_venta IN NUMBER,
    p_V_Id_factura IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Precio_venta IN NUMBER,
    p_V_Fecha_venta IN DATE,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_VENTAS_TB (
        V_Id_venta, V_Id_factura, V_Id_cliente, V_Cantidad_producto, V_Precio_venta, V_Fecha_venta, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_venta, p_V_Id_factura, p_V_Id_cliente, p_V_Cantidad_producto, p_V_Precio_venta, p_V_Fecha_venta, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_VENTAS (
    p_V_Id_venta IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_VENTAS_TB
    WHERE V_Id_venta = p_V_Id_venta;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_VENTAS (
    p_V_Id_venta IN NUMBER,
    p_V_Id_factura IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Precio_venta IN NUMBER,
    p_V_Fecha_venta IN DATE,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_VENTAS_TB
    SET V_Id_factura = p_V_Id_factura,
        V_Id_cliente = p_V_Id_cliente,
        V_Cantidad_producto = p_V_Cantidad_producto,
        V_Precio_venta = p_V_Precio_venta,
        V_Fecha_venta = p_V_Fecha_venta,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_venta = p_V_Id_venta;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_VENTAS (
    p_V_Id_venta IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_VENTAS_TB
    WHERE V_Id_venta = p_V_Id_venta;
END;
/

--Funciones

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
--Funcion que retorna el porcentaje de descuento 

CREATE OR REPLACE FUNCTION FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN (
    P_Id_cliente NUMBER
) RETURN NUMBER IS
    V_Total_orders NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO V_Total_orders
    FROM FIDE_ORDERS_TB
    WHERE FIDE_ORDERS_V_Id_cliente_FK = P_Id_cliente;
    
    RETURN V_Total_orders;
END FIDE_CLIENTES_OBTENER_TOTAL_ORDENES_FN;
--Funcion que retorna total de ordenes puestas por un 1 cliente.

CREATE OR REPLACE FUNCTION FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN (
    P_Id_producto NUMBER
) RETURN NUMBER IS
    V_Total_sales NUMBER;
BEGIN
    SELECT SUM(V.Cantidad_producto)
    INTO V_Total_sales
    FROM FIDE_VENTAS_TB V
    WHERE V.FIDE_VENTAS_V_Id_producto_FK = P_Id_producto;
    
    RETURN V_Total_sales;
END FIDE_VENTAS_OBTENER_TOTAL_VENTAS_FN;
--Funcion que retorna el total de ventas de un producto

