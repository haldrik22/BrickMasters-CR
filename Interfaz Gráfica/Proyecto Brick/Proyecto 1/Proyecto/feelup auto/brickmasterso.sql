CREATE TABLE Cliente (
    ID_Cliente INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(50),
    PrimerApellido VARCHAR2(50),
    SegundoApellido VARCHAR2(50),
    Direccion VARCHAR2(100),
    Telefono VARCHAR2(100),
    Correo VARCHAR2(100)
);

CREATE TABLE Distribuidor (
    ID_Distribuidor INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(50),
    Apellidos VARCHAR2(50),
    Email VARCHAR2(50),
    Telefono VARCHAR2(20),
    Direccion CLOB
);

CREATE TABLE Producto (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(255) NOT NULL,
    Rango_Edad VARCHAR2(50),
    Detalles_Juego CLOB NOT NULL,
    Precio NUMBER(10, 2) NOT NULL,
    Cantidad INT NOT NULL,
    Fecha_Ingreso DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Pagos (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nombre VARCHAR2(255) NOT NULL,
    Email VARCHAR2(255) NOT NULL,
    Metodo VARCHAR2(255) NOT NULL,
    Detalles CLOB NOT NULL,
    Fecha DATE DEFAULT CURRENT_DATE
);

CREATE OR REPLACE PACKAGE paquete_productos AS
   -- Procedimiento para insertar un nuevo producto
   PROCEDURE insertar_producto(
      p_nombre_producto IN VARCHAR2,
      p_rango_edad IN VARCHAR2,
      p_detalles_juego IN CLOB,
      p_precio IN NUMBER,
      p_cantidad IN NUMBER
   );
   
   -- Procedimiento para consultar productos
   PROCEDURE consultar_producto(
      p_tour_id IN NUMBER,
      p_cursor OUT SYS_REFCURSOR
   );
   
   -- Procedimiento para eliminar un producto por ID
   PROCEDURE eliminar_producto(
      p_producto_id IN NUMBER
   );
   
   -- Procedimiento para actualizar un producto
   PROCEDURE actualizar_producto(
      p_producto_id IN Producto.ID%TYPE,
      p_nombre_producto IN Producto.Nombre%TYPE,
      p_rango_edad IN Producto.Rango_Edad%TYPE,
      p_detalles_juego IN Producto.Detalles_Juego%TYPE,
      p_precio IN Producto.Precio%TYPE,
      p_cantidad IN Producto.Cantidad%TYPE
   );
END paquete_productos;

CREATE OR REPLACE PACKAGE paquete_distribuidores AS
   -- Procedimiento para consultar un distribuidor por ID
   PROCEDURE consultar_distribuidor(
      p_distribuidor_id IN NUMBER,
      p_cursor OUT SYS_REFCURSOR
   );
   
   -- Procedimiento para insertar un nuevo distribuidor
   PROCEDURE insertar_distribuidor(
      p_nombre_distribuidor IN VARCHAR2,
      p_apellidos IN VARCHAR2,
      p_email IN VARCHAR2,
      p_telefono IN VARCHAR2,
      p_direccion IN CLOB
   );
   
   -- Procedimiento para eliminar un distribuidor por ID
   PROCEDURE eliminar_distribuidor(
      p_distribuidor_id IN NUMBER
   );
   
   -- Procedimiento para actualizar un distribuidor
   PROCEDURE actualizar_distribuidor(
      p_distribuidor_id IN Distribuidor.ID_Distribuidor%TYPE,
      p_nombre_distribuidor IN Distribuidor.Nombre%TYPE,
      p_apellidos IN Distribuidor.Apellidos%TYPE,
      p_email IN Distribuidor.Email%TYPE,
      p_telefono IN Distribuidor.Telefono%TYPE,
      p_direccion IN Distribuidor.Direccion%TYPE
   );
END paquete_distribuidores;

CREATE OR REPLACE PACKAGE paquete_pagos AS
   -- Procedimiento para insertar un nuevo pago
   PROCEDURE insertar_pago(
      p_nombre IN VARCHAR2,
      p_email IN VARCHAR2,
      p_metodo IN VARCHAR2,
      p_detalles IN CLOB
   );
   
   -- Procedimiento para consultar un pago por ID
   PROCEDURE consultar_pago(
      p_pago_id IN NUMBER,
      p_cursor OUT SYS_REFCURSOR
   );
   
   -- Procedimiento para eliminar un pago por ID
   PROCEDURE eliminar_pago(
      p_pago_id IN NUMBER
   );
   
   -- Procedimiento para actualizar un pago
   PROCEDURE actualizar_pago(
      p_pago_id IN Pagos.ID%TYPE,
      p_nombre IN Pagos.Nombre%TYPE,
      p_email IN Pagos.Email%TYPE,
      p_metodo IN Pagos.Metodo%TYPE,
      p_detalles IN Pagos.Detalles%TYPE
   );
END paquete_pagos;

CREATE OR REPLACE PACKAGE paquete_clientes AS
   -- Procedimiento para insertar un nuevo cliente
   PROCEDURE insertar_cliente(
      p_nombre IN VARCHAR2,
      p_primer_apellido IN VARCHAR2,
      p_segundo_apellido IN VARCHAR2,
      p_direccion IN VARCHAR2,
      p_telefono IN VARCHAR2,
      p_correo IN VARCHAR2
   );
   
   -- Procedimiento para consultar un cliente por ID
   PROCEDURE consultar_cliente(
      p_cliente_id IN NUMBER,
      p_cursor OUT SYS_REFCURSOR
   );
   
   -- Procedimiento para eliminar un cliente por ID
   PROCEDURE eliminar_cliente(
      p_cliente_id IN NUMBER
   );
   
   -- Procedimiento para actualizar un cliente
   PROCEDURE actualizar_cliente(
      p_cliente_id IN Cliente.ID_Cliente%TYPE,
      p_nombre IN Cliente.Nombre%TYPE,
      p_primer_apellido IN Cliente.PrimerApellido%TYPE,
      p_segundo_apellido IN Cliente.SegundoApellido%TYPE,
      p_direccion IN Cliente.Direccion%TYPE,
      p_telefono IN Cliente.Telefono%TYPE,
      p_correo IN Cliente.Correo%TYPE
   );
END paquete_clientes;

CREATE OR REPLACE TRIGGER TRG_CREATED_BY
BEFORE INSERT ON Usuarios
FOR EACH ROW
BEGIN
  :NEW.CREADO_POR := USER;
END;

CREATE OR REPLACE TRIGGER TRG_MODIFIED_BY
BEFORE UPDATE ON Usuarios
FOR EACH ROW
BEGIN
  :NEW.MODIFICADO_POR := USER;
END;

CREATE OR REPLACE TRIGGER TRG_CREATED_DATE
BEFORE INSERT ON Usuarios
FOR EACH ROW
BEGIN
  :NEW.FECHA_CREACION := SYSDATE;
END;

CREATE OR REPLACE TRIGGER TRG_MODIFIED_DATE
BEFORE UPDATE ON Usuarios
FOR EACH ROW
BEGIN
  :NEW.FECHA_MODIFICACION := SYSDATE;
END;

CREATE OR REPLACE FUNCTION obtener_cliente(p_cliente_id IN NUMBER)
RETURN SYS_REFCURSOR
IS
   cliente SYS_REFCURSOR;
BEGIN
   OPEN cliente FOR
      SELECT * FROM Cliente
      WHERE ID_Cliente = p_cliente_id;
   RETURN cliente;
END obtener_cliente;

CREATE OR REPLACE FUNCTION obtener_distribuidor(p_distribuidor_id IN NUMBER)
RETURN SYS_REFCURSOR
IS
   distribuidor SYS_REFCURSOR;
BEGIN
   OPEN distribuidor FOR
      SELECT * FROM Distribuidor
      WHERE ID_Distribuidor = p_distribuidor_id;
   RETURN distribuidor;
END obtener_distribuidor;

CREATE OR REPLACE FUNCTION obtener_producto(p_producto_id IN NUMBER)
RETURN SYS_REFCURSOR
IS
   producto SYS_REFCURSOR;
BEGIN
   OPEN producto FOR
      SELECT * FROM Producto
      WHERE ID = p_producto_id;
   RETURN producto;
END obtener_producto;

CREATE OR REPLACE FUNCTION obtener_pago(p_pago_id IN NUMBER)
RETURN SYS_REFCURSOR
IS
   pago SYS_REFCURSOR;
BEGIN
   OPEN pago FOR
      SELECT * FROM Pagos
      WHERE ID = p_pago_id;
   RETURN pago;
END obtener_pago;

CREATE OR REPLACE PROCEDURE insertar_cliente(p_nombre IN VARCHAR2, p_primer_apellido IN VARCHAR2, p_segundo_apellido IN VARCHAR2, p_direccion IN VARCHAR2, p_telefono IN VARCHAR2, p_correo IN VARCHAR2)
IS
BEGIN
   INSERT INTO Cliente(Nombre, PrimerApellido, SegundoApellido, Direccion, Telefono, Correo)
   VALUES(p_nombre, p_primer_apellido, p_segundo_apellido, p_direccion, p_telefono, p_correo);
   COMMIT;
END insertar_cliente;

CREATE OR REPLACE PROCEDURE insertar_distribuidor(p_nombre IN VARCHAR2, p_apellidos IN VARCHAR2, p_email IN VARCHAR2, p_metodo IN VARCHAR2, p_detalles IN CLOB)
IS
BEGIN
   INSERT INTO Distribuidor(Nombre, Apellidos, Email, Metodo, Detalles)
   VALUES(p_nombre, p_apellidos, p_email, p_metodo, p_detalles);
   COMMIT;
END insertar_distribuidor;

CREATE OR REPLACE PROCEDURE insertar_producto(p_nombre IN VARCHAR2, p_rango_edad IN VARCHAR2, p_detalles_juego IN CLOB, p_precio IN NUMBER, p_cantidad IN INT)
IS
BEGIN
   INSERT INTO Producto(Nombre, Rango_Edad, Detalles_Juego, Precio, Cantidad)
   VALUES(p_nombre, p_rango_edad, p_detalles_juego, p_precio, p_cantidad);
   COMMIT;
END insertar_producto;

CREATE OR REPLACE PROCEDURE insertar_pago(p_nombre IN VARCHAR2, p_email IN VARCHAR2, p_metodo IN VARCHAR2, p_detalles IN CLOB)
IS
BEGIN
   INSERT INTO Pagos(Nombre, Email, Metodo, Detalles)
   VALUES(p_nombre, p_email, p_metodo, p_detalles);
   COMMIT;
END insertar_pago;

CREATE OR REPLACE FUNCTION obtener_distribuidores()
RETURN SYS_REFCURSOR
IS
   distribuidores SYS_REFCURSOR;
BEGIN
   OPEN distribuidores FOR
      SELECT * FROM Distribuidor;
   RETURN distribuidores;
END obtener_distribuidores;

CREATE OR REPLACE PROCEDURE actualizar_distribuidor(p_distribuidor_id IN NUMBER, p_nombre IN VARCHAR2, p_apellidos IN VARCHAR2, p_email IN VARCHAR2, p_telefono IN VARCHAR2, p_direccion IN CLOB)
IS
BEGIN
   UPDATE Distribuidor
   SET Nombre = p_nombre, Apellidos = p_apellidos, Email = p_email, Telefono = p_telefono, Direccion = p_direccion
   WHERE ID_Distribuidor = p_distribuidor_id;
   COMMIT;
END actualizar_distribuidor;

CREATE OR REPLACE PROCEDURE eliminar_distribuidor(p_distribuidor_id IN NUMBER)
IS
BEGIN
   DELETE FROM Distribuidor
   WHERE ID_Distribuidor = p_distribuidor_id;
   COMMIT;
END eliminar_distribuidor;

CREATE OR REPLACE FUNCTION obtener_productos()
RETURN SYS_REFCURSOR
IS
   productos SYS_REFCURSOR;
BEGIN
   OPEN productos FOR
      SELECT * FROM Producto;
   RETURN productos;
END obtener_productos;

CREATE OR REPLACE PROCEDURE actualizar_producto(p_producto_id IN NUMBER, p_nombre IN VARCHAR2, p_rango_edad IN VARCHAR2, p_detalles_juego IN CLOB, p_precio IN NUMBER, p_cantidad IN INT)
IS
BEGIN
   UPDATE Producto
   SET Nombre = p_nombre, Rango_Edad = p_rango_edad, Detalles_Juego = p_detalles_juego, Precio = p_precio, Cantidad = p_cantidad
   WHERE ID = p_producto_id;
   COMMIT;
END actualizar_producto;

CREATE OR REPLACE PROCEDURE eliminar_producto(p_producto_id IN NUMBER)
IS
BEGIN
   DELETE FROM Producto
   WHERE ID = p_producto_id;
   COMMIT;
END eliminar_producto;

CREATE OR REPLACE FUNCTION obtener_pagos()
RETURN SYS_REFCURSOR
IS
   pagos SYS_REFCURSOR;
BEGIN
   OPEN pagos FOR
      SELECT * FROM Pagos;
   RETURN pagos;
END obtener_pagos;

CREATE OR REPLACE PROCEDURE actualizar_pago(p_pago_id IN NUMBER, p_nombre IN VARCHAR2, p_email IN VARCHAR2, p_metodo IN VARCHAR2, p_detalles IN CLOB)
IS
BEGIN
   UPDATE Pagos
   SET Nombre = p_nombre, Email = p_email, Metodo = p_metodo, Detalles = p_detalles
   WHERE ID = p_pago_id;
   COMMIT;
END actualizar_pago;

CREATE OR REPLACE PROCEDURE eliminar_pago(p_pago_id IN NUMBER)
IS
BEGIN
   DELETE FROM Pagos
   WHERE ID = p_pago_id;
   COMMIT;
END eliminar_pago;

CREATE OR REPLACE FUNCTION obtener_usuarios()
RETURN SYS_REFCURSOR
IS
   usuarios SYS_REFCURSOR;
BEGIN
   OPEN usuarios FOR
      SELECT * FROM Usuario;
   RETURN usuarios;
END obtener_usuarios;

CREATE OR REPLACE PROCEDURE actualizar_usuario(p_usuario_id IN NUMBER, p_nombre IN VARCHAR2, p_apellidos IN VARCHAR2, p_email IN VARCHAR2, p_contraseña IN VARCHAR2, p_tipo IN VARCHAR2)
IS
BEGIN
   UPDATE Usuario
   SET Nombre = p_nombre, Apellidos = p_apellidos, Email = p_email, Contraseña = p_contraseña, Tipo = p_tipo
   WHERE ID = p_usuario_id;
   COMMIT;
END actualizar_usuario;

CREATE OR REPLACE PROCEDURE eliminar_usuario(p_usuario_id IN NUMBER)
IS
BEGIN
   DELETE FROM Usuario
   WHERE ID = p_usuario_id;
   COMMIT;
END eliminar_usuario;

CREATE OR REPLACE FUNCTION obtener_ventas()
RETURN SYS_REFCURSOR
IS
   ventas SYS_REFCURSOR;
BEGIN
   OPEN ventas FOR
      SELECT * FROM Venta;
   RETURN ventas;
END obtener_ventas;

CREATE OR REPLACE PROCEDURE actualizar_venta(p_venta_id IN NUMBER, p_fecha IN DATE, p_distribuidor_id IN NUMBER, p_producto_id IN NUMBER, p_cantidad IN INT, p_precio_total IN NUMBER, p_usuario_id IN NUMBER)
IS
BEGIN
   UPDATE Venta
   SET Fecha = p_fecha, ID_Distribuidor = p_distribuidor_id, ID_Producto = p_producto_id, Cantidad = p_cantidad, Precio_Total = p_precio_total, ID_Usuario = p_usuario_id
   WHERE ID = p_venta_id;
   COMMIT;
END actualizar_venta;

CREATE OR REPLACE PROCEDURE eliminar_venta(p_venta_id IN NUMBER)
IS
BEGIN
   DELETE FROM Venta
   WHERE ID = p_venta_id;
   COMMIT;
END eliminar_venta;