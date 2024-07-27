import cx_Oracle
from datetime import datetime

def create_invoice(cur):
    id_factura = int(input("Ingrese el ID de la factura: "))
    id_producto = int(input("Ingrese el ID del producto: "))
    id_descuento = int(input("Ingrese el ID del descuento: "))
    id_cliente = int(input("Ingrese el ID del cliente: "))
    id_local = int(input("Ingrese el ID del local: "))
    cantidad_producto = int(input("Ingrese la cantidad del producto: "))
    precio_subtotal = float(input("Ingrese el precio subtotal: "))
    precio_total = float(input("Ingrese el precio total: "))
    fecha_pago = input("Ingrese la fecha de pago (YYYY-MM-DD): ")
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_FACTURACION_CREATE_SP", [id_factura, id_producto, id_descuento, id_cliente, id_local, 
                                                cantidad_producto, precio_subtotal, precio_total, fecha_pago,
                                                creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Factura creada exitosamente.")

def read_invoice(cur):
    id_factura = int(input("Ingrese el ID de la factura a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_FACTURACION_READ_SP", [id_factura, result])
    
    for row in result.getvalue():
        print(row)

def update_invoice(cur):
    id_factura = int(input("Ingrese el ID de la factura a actualizar: "))
    id_producto = int(input("Ingrese el nuevo ID del producto: "))
    id_descuento = int(input("Ingrese el nuevo ID del descuento: "))
    id_cliente = int(input("Ingrese el nuevo ID del cliente: "))
    id_local = int(input("Ingrese el nuevo ID del local: "))
    cantidad_producto = int(input("Ingrese la nueva cantidad del producto: "))
    precio_subtotal = float(input("Ingrese el nuevo precio subtotal: "))
    precio_total = float(input("Ingrese el nuevo precio total: "))
    fecha_pago = input("Ingrese la nueva fecha de pago (YYYY-MM-DD): ").strftime("%Y-%m-%d")
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_FACTURACION_UPDATE_SP", [id_factura, id_producto, id_descuento, id_cliente, id_local, 
                                                cantidad_producto, precio_subtotal, precio_total, fecha_pago,
                                                modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Factura actualizada exitosamente.")

def delete_invoice(cur):
    id_factura = int(input("Ingrese el ID de la factura a eliminar: "))
    
    cur.callproc("FIDE_FACTURACION_DELETE_SP", [id_factura])
    cur.connection.commit()
    
    print("Factura eliminada exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear factura")
            print("2. Leer factura")
            print("3. Actualizar factura")
            print("4. Eliminar factura")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_invoice(cur)
            elif choice == '2':
                read_invoice(cur)
            elif choice == '3':
                update_invoice(cur)
            elif choice == '4':
                delete_invoice(cur)
            elif choice == '5':
                break
            else:
                print("Opción no válida. Por favor, intente de nuevo.")
        
    except Exception as err:
        print('Error al ejecutar la operación:', err)
    finally:
        cur.close()
finally:
    conn.close()