--CREADO POR: Alberto Joxhan Martínez Castro
--FECHA DE CREACIÓN: 08/21/2024
--Insertando productos en la tabla FIDE_PRODUCTOS_TB

BEGIN
    FIDE_PRODUCTOS_CREATE_SP(
        P_Nom_producto => 'Juego Uno',
        P_Piezas_producto => 108, -- Assumed number of pieces for the product
        P_Precio_producto => 12,
        P_Cantidad_producto => 150,
        P_Descripcion_producto => 'El clásico juego de cartas Uno, ideal para horas de diversión en familia o con amigos. Incluye cartas con colores vibrantes y reglas sencillas.'
    );
END;
/

BEGIN
    FIDE_PRODUCTOS_CREATE_SP(
        P_Nom_producto => 'Juego Mancala',
        P_Piezas_producto => 50, -- Assumed number of pieces for the product
        P_Precio_producto => 25,
        P_Cantidad_producto => 80,
        P_Descripcion_producto => 'El juego de mesa Mancala es una excelente opción para quienes disfrutan de juegos de estrategia. Fabricado en madera de alta calidad.'
    );
END;
/

BEGIN
    FIDE_PRODUCTOS_CREATE_SP(
        P_Nom_producto => 'Juego Clue Viaje',
        P_Piezas_producto => 30, -- Assumed number of pieces for the product
        P_Precio_producto => 18,
        P_Cantidad_producto => 100,
        P_Descripcion_producto => 'Versión de viaje del popular juego de misterio Clue. Ideal para llevar a cualquier lugar y resolver el misterio de quién es el asesino.'
    );
END;
/
ALTER TABLE FIDE_PRODUCTOS_TB
MODIFY V_DESCRIPCION_PRODUCTO VARCHAR2(200 BYTE);
/
--CREADO POR: Alberto Joxhan Martínez Castro
--FECHA DE CREACIÓN: 21/08/2024

CREATE OR REPLACE TRIGGER FIDE_PRODUCTOS_TB_INSERT_CATALOGO_TRG
AFTER INSERT ON FIDE_PRODUCTOS_TB
FOR EACH ROW
BEGIN
    INSERT INTO FIDE_CATALOGO_TB (
        V_NOM_PRODUCTO,
        V_PRECIO_PRODUCTO,
        V_DESCRIPCION_PRODUCTO,
        V_CANTIDAD_PRODUCTO,
        V_IMAGE_PATH
    ) VALUES (
        :NEW.V_NOM_PRODUCTO,
        :NEW.V_PRECIO_PRODUCTO,
        :NEW.V_DESCRIPCION_PRODUCTO,
        :NEW.V_CANTIDAD_PRODUCTO,
        NULL  
    );
END;
/

CREATE OR REPLACE TRIGGER FIDE_FACTURACION_TB_INSERT_ENTREGA_VENTA_TRG
AFTER INSERT ON FIDE_FACTURACION_TB
FOR EACH ROW
DECLARE
    v_entrega_id NUMBER;
    v_direccion_cliente VARCHAR2(200);
    v_tel_cliente VARCHAR2(20);
BEGIN
    SELECT V_DIRECCION_CLIENTE, V_TEL_CLIENTE
    INTO v_direccion_cliente, v_tel_cliente
    FROM FIDE_CLIENTES_TB
    WHERE FIDE_CLIENTES_V_Id_cliente_PK = :NEW.FIDE_FACTURACION_V_Id_cliente_FK;

    FIDE_ENTREGAS_CREATE_SP(
        P_FIDE_ENTREGAS_V_Id_cliente_FK => :NEW.FIDE_FACTURACION_V_Id_cliente_FK,
        P_V_Direccion_cliente => v_direccion_cliente,
        P_V_Tel_cliente => v_tel_cliente
    );

    SELECT FIDE_ENTREGAS_ID_SEQ.CURRVAL INTO v_entrega_id FROM DUAL;

    FIDE_VENTAS_CREATE_SP(
        P_FIDE_VENTAS_V_Id_factura_FK => :NEW.FIDE_FACTURACION_V_Id_factura_PK,
        P_FIDE_VENTAS_V_Id_producto_FK => :NEW.FIDE_FACTURACION_V_Id_producto_FK,
        P_FIDE_VENTAS_V_Id_local_FK => :NEW.FIDE_FACTURACION_V_Id_local_FK,
        P_FIDE_VENTAS_V_Id_entrega_FK => v_entrega_id
    );
END;
/

ALTER TABLE FIDE_ENTREGAS_TB 
ADD V_ESTADO VARCHAR2(50 BYTE);
/

CREATE OR REPLACE TRIGGER FIDE_PRODUCTOS_TB_UPDATE_FACTURA_VENTA_TRG
AFTER UPDATE ON FIDE_PRODUCTOS_TB
FOR EACH ROW
BEGIN
    UPDATE FIDE_FACTURACION_TB
    SET FIDE_FACTURACION_V_ID_PRODUCTO_FK = :NEW.FIDE_PRODUCTOS_V_Id_producto_PK
    WHERE FIDE_FACTURACION_V_ID_PRODUCTO_FK = :OLD.FIDE_PRODUCTOS_V_Id_producto_PK;
    
    UPDATE FIDE_VENTAS_TB
    SET FIDE_VENTAS_V_ID_PRODUCTO_FK = :NEW.FIDE_PRODUCTOS_V_Id_producto_PK
    WHERE FIDE_VENTAS_V_ID_PRODUCTO_FK = :OLD.FIDE_PRODUCTOS_V_Id_producto_PK;
END;
/

CREATE OR REPLACE TRIGGER FIDE_LOCALES_TB_UPDATE_FACTURA_VENTA_TRG
AFTER UPDATE ON FIDE_LOCALES_TB
FOR EACH ROW
BEGIN
    UPDATE FIDE_FACTURACION_TB
    SET FIDE_FACTURACION_V_ID_LOCAL_FK = :NEW.FIDE_LOCALES_V_ID_LOCAL_PK
    WHERE FIDE_FACTURACION_V_ID_LOCAL_FK = :OLD.FIDE_LOCALES_V_ID_LOCAL_PK;
    
    UPDATE FIDE_VENTAS_TB
    SET FIDE_VENTAS_V_ID_LOCAL_FK = :NEW.FIDE_LOCALES_V_ID_LOCAL_PK
    WHERE FIDE_VENTAS_V_ID_LOCAL_FK = :OLD.FIDE_LOCALES_V_ID_LOCAL_PK;
END;
/

CREATE OR REPLACE TRIGGER FIDE_CLIENTES_TB_UPDATE_FACTURA_ENTREGA_TRG
AFTER UPDATE ON FIDE_CLIENTES_TB
FOR EACH ROW
BEGIN
    UPDATE FIDE_FACTURACION_TB
    SET FIDE_FACTURACION_V_ID_CLIENTE_FK = :NEW.FIDE_CLIENTES_V_ID_CLIENTE_PK
    WHERE FIDE_FACTURACION_V_ID_CLIENTE_FK = :OLD.FIDE_CLIENTES_V_ID_CLIENTE_PK;
    
    UPDATE FIDE_ENTREGAS_TB
    SET FIDE_ENTREGAS_V_ID_CLIENTE_FK = :NEW.FIDE_CLIENTES_V_ID_CLIENTE_PK
    WHERE FIDE_ENTREGAS_V_ID_CLIENTE_FK = :OLD.FIDE_CLIENTES_V_ID_CLIENTE_PK;

    UPDATE FIDE_VENTAS_TB
    SET FIDE_VENTAS_V_ID_FACTURA_FK = :NEW.FIDE_CLIENTES_V_ID_CLIENTE_PK
    WHERE FIDE_VENTAS_V_ID_FACTURA_FK = :OLD.FIDE_CLIENTES_V_ID_CLIENTE_PK;
END;
/

CREATE OR REPLACE TRIGGER FIDE_CLIENTES_TB_UPDATE_DESC_TIPO_DESC_TRG
AFTER UPDATE ON FIDE_CLIENTES_TB
FOR EACH ROW
BEGIN
    -- Update related records in Descuentos table
    UPDATE FIDE_DESCUENTOS_TB
    SET FIDE_DESCUENTOS_V_ID_CLIENTE_FK = :NEW.FIDE_CLIENTES_V_ID_CLIENTE_PK
    WHERE FIDE_DESCUENTOS_V_ID_CLIENTE_FK = :OLD.FIDE_CLIENTES_V_ID_CLIENTE_PK;
    
    -- Update related records in Tipo Descuento table
    UPDATE FIDE_TIPO_DESCUENTO_TB
    SET FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK = :NEW.FIDE_CLIENTES_V_ID_CLIENTE_PK
    WHERE FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK = :OLD.FIDE_CLIENTES_V_ID_CLIENTE_PK;
END;
/

CREATE OR REPLACE TRIGGER FIDE_PRODUCTOS_TB_UPDATE_PROVEEDORES_PRODUCTO_TRG
AFTER UPDATE ON FIDE_PRODUCTOS_TB
FOR EACH ROW
BEGIN
    -- Update related records in Proveedores Producto table
    UPDATE FIDE_PROVEEDORES_PRODUCTO_TB
    SET FIDE_PROVEEDORES_PRODUCTO_V_ID_PRODUCTO_FK = :NEW.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK
    WHERE FIDE_PROVEEDORES_PRODUCTO_V_ID_PRODUCTO_FK = :OLD.FIDE_PRODUCTOS_V_ID_PRODUCTO_PK;
END;
/

CREATE OR REPLACE TRIGGER FIDE_TIPO_DESCUENTO_TB_UPDATE_DESC_TB_TRG
AFTER UPDATE ON FIDE_TIPO_DESCUENTO_TB
FOR EACH ROW
BEGIN
    -- Update related records in Descuentos table
    UPDATE FIDE_DESCUENTOS_TB
    SET FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK = :NEW.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK
    WHERE FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK = :OLD.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK;
END;
/

-- Inserting providers into FIDE_PROVEEDORES_TB
BEGIN
    FIDE_PROVEEDORES_CREATE_SP(
        'Juguetes La Paz S.A.', 
        'contacto@jugueteslapaz.cr', 
        'Juegos de Mesa', 
        '2244-5566', 
        'Avenida Central, San José, Costa Rica'
    );
    
    FIDE_PROVEEDORES_CREATE_SP(
        'Entretenimiento Global S.A.', 
        'ventas@entretenglobal.cr', 
        'Juegos de Estrategia', 
        '2277-8899', 
        'Calle 4, Edificio Colón, Escazú, Costa Rica'
    );
    
    FIDE_PROVEEDORES_CREATE_SP(
        'Distribuidora Diversión S.A.', 
        'info@distribuidiversion.cr', 
        'Juegos de Viaje', 
        '2233-4455', 
        'Boulevard de los Yoses, San Pedro, Costa Rica'
    );
END;
/

-- Linking providers to existing products in FIDE_PROVEEDORES_PRODUCTO_TB using the FIDE_PRODUCTOS_TB table
BEGIN
    -- Assuming the provider IDs are 1, 2, 3 and the product IDs are 1, 2, 3 based on the FIDE_PRODUCTOS_TB table
    FIDE_PROVEEDORES_PRODUCTO_CREATE_SP(1, 1); -- Juguetes La Paz S.A. provides Juego Uno (Product ID: 1)
    FIDE_PROVEEDORES_PRODUCTO_CREATE_SP(2, 2); -- Entretenimiento Global S.A. provides Juego Mancala (Product ID: 2)
    FIDE_PROVEEDORES_PRODUCTO_CREATE_SP(3, 3); -- Distribuidora Diversión S.A. provides Juego Clue Viaje (Product ID: 3)
END;
/
COMMIT;

SELECT e.FIDE_ENTREGAS_V_ID_ENTREGA_PK
FROM FIDE_ENTREGAS_TB e
JOIN FIDE_FACTURACION_TB f ON e.FIDE_ENTREGAS_V_ID_CLIENTE_FK = f.FIDE_FACTURACION_V_ID_CLIENTE_FK
WHERE f.FIDE_FACTURACION_V_ID_FACTURA_PK = 8
ORDER BY e.V_FECHA_DE_CREACION DESC
FETCH FIRST 1 ROWS ONLY;
/

SELECT FIDE_FACTURACION_ID_SEQ.CURRVAL FROM DUAL;


CREATE OR REPLACE TRIGGER FIDE_PROVEEDORES_TB_UPDATE_TRG
BEFORE UPDATE ON FIDE_PROVEEDORES_TB
FOR EACH ROW
BEGIN
    :NEW.V_Accion := 'UPDATE';

    IF :NEW.V_Estado IS NULL THEN
        :NEW.V_Estado := :OLD.V_Estado;
    END IF;
END;
/

DROP TRIGGER FIDE_PRODUCTOS_TB_INSERT_CATALOGO_TRG;


