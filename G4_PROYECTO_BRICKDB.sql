--INICIO: Creaci�n del usuario y esquema para el proyecto. Ambos nombrados G4_PROYECTO_BRICKDB
--GRANTS CONCEDIDOS: DBA, CONNECT, RESOURCE.

--Probando conexi�n GIT con Oracle SQL Developer

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
    V_Tel_local VARCHAR2(15), -- Cambiado a VARCHAR2 para permitir formatos de tel�fono
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
    V_Tel_cliente VARCHAR2(15), -- Cambiado a VARCHAR2 para formatos de tel�fono
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
    V_Tel_proveedor VARCHAR2(15), -- Cambiado a VARCHAR2 para formatos de tel�fono
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
    V_Tel_cliente VARCHAR2(15), -- Cambiado a VARCHAR2 para formatos de tel�fono
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
-- Comentario ejemplo

--Procedimientos CRUD para FIDE_LOCALES_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_LOCAL (
    p_V_Id_local IN VARCHAR2,
    p_V_Nom_local IN VARCHAR2,
    p_V_Tel_local IN NUMBER,
    p_V_Direccion_local IN VARCHAR2,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_LOCALES_TB (
        V_Id_local, V_Nom_local, V_Tel_local, V_Direccion_local, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_local, p_V_Nom_local, p_V_Tel_local, p_V_Direccion_local, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_LOCAL (
    p_V_Id_local IN VARCHAR2,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_LOCALES_TB
    WHERE V_Id_local = p_V_Id_local;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_LOCAL (
    p_V_Id_local IN VARCHAR2,
    p_V_Nom_local IN VARCHAR2,
    p_V_Tel_local IN NUMBER,
    p_V_Direccion_local IN VARCHAR2,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_LOCALES_TB
    SET V_Nom_local = p_V_Nom_local,
        V_Tel_local = p_V_Tel_local,
        V_Direccion_local = p_V_Direccion_local,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_local = p_V_Id_local;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_LOCAL (
    p_V_Id_local IN VARCHAR2
) AS
BEGIN
    DELETE FROM FIDE_LOCALES_TB
    WHERE V_Id_local = p_V_Id_local;
END;
/

--Procedimientos CRUD para FIDE_CLIENTES_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_CLIENTE (
    p_V_Id_cliente IN NUMBER,
    p_V_Nom_cliente IN VARCHAR2,
    p_V_Ape_cliente IN VARCHAR2,
    p_V_Correo_cliente IN VARCHAR2,
    p_V_Tel_cliente IN NUMBER,
    p_V_Direccion_cliente IN VARCHAR2,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_CLIENTES_TB (
        V_Id_cliente, V_Nom_cliente, V_Ape_cliente, V_Correo_cliente, V_Tel_cliente, V_Direccion_cliente, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_cliente, p_V_Nom_cliente, p_V_Ape_cliente, p_V_Correo_cliente, p_V_Tel_cliente, p_V_Direccion_cliente, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_CLIENTE (
    p_V_Id_cliente IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_CLIENTES_TB
    WHERE V_Id_cliente = p_V_Id_cliente;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_CLIENTE (
    p_V_Id_cliente IN NUMBER,
    p_V_Nom_cliente IN VARCHAR2,
    p_V_Ape_cliente IN VARCHAR2,
    p_V_Correo_cliente IN VARCHAR2,
    p_V_Tel_cliente IN NUMBER,
    p_V_Direccion_cliente IN VARCHAR2,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_CLIENTES_TB
    SET V_Nom_cliente = p_V_Nom_cliente,
        V_Ape_cliente = p_V_Ape_cliente,
        V_Correo_cliente = p_V_Correo_cliente,
        V_Tel_cliente = p_V_Tel_cliente,
        V_Direccion_cliente = p_V_Direccion_cliente,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_cliente = p_V_Id_cliente;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_CLIENTE (
    p_V_Id_cliente IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_CLIENTES_TB
    WHERE V_Id_cliente = p_V_Id_cliente;
END;
/

--Procedimientos CRUD para FIDE_PRODUCTOS_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_PRODUCTO (
    p_V_Id_producto IN NUMBER,
    p_V_Nom_producto IN VARCHAR2,
    p_V_Piezas_producto IN NUMBER,
    p_V_Precio_producto IN NUMBER,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Descripcion_producto IN VARCHAR2,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PRODUCTOS_TB (
        V_Id_producto, V_Nom_producto, V_Piezas_producto, V_Precio_producto, V_Cantidad_producto, V_Descripcion_producto, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_producto, p_V_Nom_producto, p_V_Piezas_producto, p_V_Precio_producto, p_V_Cantidad_producto, p_V_Descripcion_producto, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_PRODUCTO (
    p_V_Id_producto IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_PRODUCTOS_TB
    WHERE V_Id_producto = p_V_Id_producto;
END;
/


CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_PRODUCTO (
    p_V_Id_producto IN NUMBER,
    p_V_Nom_producto IN VARCHAR2,
    p_V_Piezas_producto IN NUMBER,
    p_V_Precio_producto IN NUMBER,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Descripcion_producto IN VARCHAR2,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_PRODUCTOS_TB
    SET V_Nom_producto = p_V_Nom_producto,
        V_Piezas_producto = p_V_Piezas_producto,
        V_Precio_producto = p_V_Precio_producto,
        V_Cantidad_producto = p_V_Cantidad_producto,
        V_Descripcion_producto = p_V_Descripcion_producto,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_producto = p_V_Id_producto;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_PRODUCTO (
    p_V_Id_producto IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_PRODUCTOS_TB
    WHERE V_Id_producto = p_V_Id_producto;
END;
/

--Procedimientos CRUD para FIDE_PROVEEDORES_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_PROVEEDOR (
    p_V_Id_proveedor IN NUMBER,
    p_V_Nom_provedor IN VARCHAR2,
    p_V_Correo_proveedor IN VARCHAR2,
    p_V_Producto_proveedor IN VARCHAR2,
    p_V_Tel_proveedor IN NUMBER,
    p_V_Direccion_proveedor IN VARCHAR2,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_PROVEEDORES_TB (
        V_Id_proveedor, V_Nom_provedor, V_Correo_proveedor, V_Producto_proveedor, V_Tel_proveedor, V_Direccion_proveedor, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_proveedor, p_V_Nom_provedor, p_V_Correo_proveedor, p_V_Producto_proveedor, p_V_Tel_proveedor, p_V_Direccion_proveedor, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_PROVEEDOR (
    p_V_Id_proveedor IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_PROVEEDORES_TB
    WHERE V_Id_proveedor = p_V_Id_proveedor;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_PROVEEDOR (
    p_V_Id_proveedor IN NUMBER,
    p_V_Nom_provedor IN VARCHAR2,
    p_V_Correo_proveedor IN VARCHAR2,
    p_V_Producto_proveedor IN VARCHAR2,
    p_V_Tel_proveedor IN NUMBER,
    p_V_Direccion_proveedor IN VARCHAR2,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_PROVEEDORES_TB
    SET V_Nom_provedor = p_V_Nom_provedor,
        V_Correo_proveedor = p_V_Correo_proveedor,
        V_Producto_proveedor = p_V_Producto_proveedor,
        V_Tel_proveedor = p_V_Tel_proveedor,
        V_Direccion_proveedor = p_V_Direccion_proveedor,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_proveedor = p_V_Id_proveedor;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_PROVEEDOR (
    p_V_Id_proveedor IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_PROVEEDORES_TB
    WHERE V_Id_proveedor = p_V_Id_proveedor;
END;
/

--Procedimientos CRUD para FIDE_CATALOGO_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_CATALOGO (
    p_V_Id_producto IN NUMBER,
    p_V_Nom_producto IN VARCHAR2,
    p_V_Precio_producto IN NUMBER,
    p_V_Descripcion_producto IN VARCHAR2,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_CATALOGO_TB (
        V_Id_producto, V_Nom_producto, V_Precio_producto, V_Descripcion_producto, V_Cantidad_producto, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_producto, p_V_Nom_producto, p_V_Precio_producto, p_V_Descripcion_producto, p_V_Cantidad_producto, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_CATALOGO (
    p_V_Id_producto IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_CATALOGO_TB
    WHERE V_Id_producto = p_V_Id_producto;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_CATALOGO (
    p_V_Id_producto IN NUMBER,
    p_V_Nom_producto IN VARCHAR2,
    p_V_Precio_producto IN NUMBER,
    p_V_Descripcion_producto IN VARCHAR2,
    p_V_Cantidad_producto IN NUMBER,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_CATALOGO_TB
    SET V_Nom_producto = p_V_Nom_producto,
        V_Precio_producto = p_V_Precio_producto,
        V_Descripcion_producto = p_V_Descripcion_producto,
        V_Cantidad_producto = p_V_Cantidad_producto,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_producto = p_V_Id_producto;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_CATALOGO (
    p_V_Id_producto IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_CATALOGO_TB
    WHERE V_Id_producto = p_V_Id_producto;
END;
/

--Procedimientos CRUD para FIDE_TIPO_DESCUENTO_TB

CREATE OR REPLACE PROCEDURE SP_CREATE_FIDE_TIPO_DESCUENTO (
    p_V_Id_tipo_descuento IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Id_estado IN NUMBER,
    p_V_Porcentaje_descuento IN NUMBER,
    p_V_Creado_por IN VARCHAR2,
    p_V_Fecha_de_creacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    INSERT INTO FIDE_TIPO_DESCUENTO_TB (
        V_Id_tipo_descuento, V_Id_cliente, V_Id_estado, V_Porcentaje_descuento, V_Creado_por, V_Fecha_de_creacion, V_Accion
    ) VALUES (
        p_V_Id_tipo_descuento, p_V_Id_cliente, p_V_Id_estado, p_V_Porcentaje_descuento, p_V_Creado_por, p_V_Fecha_de_creacion, p_V_Accion
    );
END;
/

CREATE OR REPLACE PROCEDURE SP_READ_FIDE_TIPO_DESCUENTO (
    p_V_Id_tipo_descuento IN NUMBER,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
    SELECT * FROM FIDE_TIPO_DESCUENTO_TB
    WHERE V_Id_tipo_descuento = p_V_Id_tipo_descuento;
END;
/

CREATE OR REPLACE PROCEDURE SP_UPDATE_FIDE_TIPO_DESCUENTO (
    p_V_Id_tipo_descuento IN NUMBER,
    p_V_Id_cliente IN NUMBER,
    p_V_Id_estado IN NUMBER,
    p_V_Porcentaje_descuento IN NUMBER,
    p_V_Modificado_por IN VARCHAR2,
    p_V_Fecha_de_modificacion IN DATE,
    p_V_Accion IN VARCHAR2
) AS
BEGIN
    UPDATE FIDE_TIPO_DESCUENTO_TB
    SET V_Id_cliente = p_V_Id_cliente,
        V_Id_estado = p_V_Id_estado,
        V_Porcentaje_descuento = p_V_Porcentaje_descuento,
        V_Modificado_por = p_V_Modificado_por,
        V_Fecha_de_modificacion = p_V_Fecha_de_modificacion,
        V_Accion = p_V_Accion
    WHERE V_Id_tipo_descuento = p_V_Id_tipo_descuento;
END;
/

CREATE OR REPLACE PROCEDURE SP_DELETE_FIDE_TIPO_DESCUENTO (
    p_V_Id_tipo_descuento IN NUMBER
) AS
BEGIN
    DELETE FROM FIDE_TIPO_DESCUENTO_TB
    WHERE V_Id_tipo_descuento = p_V_Id_tipo_descuento;
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

