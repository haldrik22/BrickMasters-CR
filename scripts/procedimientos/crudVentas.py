import cx_Oracle
from datetime import datetime

def create_sale(cur):
    id_venta = int(input("Ingrese el ID de la venta: "))
    id_factura = int(input("Ingrese el ID de la factura: "))
    id_producto = int(input("Ingrese el ID del producto: "))
    id_local = int(input("Ingrese el ID del local: "))
    id_entrega = int(input("Ingrese el ID de la entrega: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_VENTAS_CREATE_SP", [id_venta, id_factura, id_producto, id_local, id_entrega, 
                                           creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Venta creada exitosamente.")

def read_sale(cur):
    id_venta = int(input("Ingrese el ID de la venta a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_VENTAS_READ_SP", [id_venta, result])
    
    for row in result.getvalue():
        print(row)

def update_sale(cur):
    id_venta = int(input("Ingrese el ID de la venta a actualizar: "))
    id_factura = int(input("Ingrese el nuevo ID de la factura: "))
    id_producto = int(input("Ingrese el nuevo ID del producto: "))
    id_local = int(input("Ingrese el nuevo ID del local: "))
    id_entrega = int(input("Ingrese el nuevo ID de la entrega: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_VENTAS_UPDATE_SP", [id_venta, id_factura, id_producto, id_local, id_entrega, 
                                           modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Venta actualizada exitosamente.")

def delete_sale(cur):
    id_venta = int(input("Ingrese el ID de la venta a eliminar: "))
    
    cur.callproc("FIDE_VENTAS_DELETE_SP", [id_venta])
    cur.connection.commit()
    
    print("Venta eliminada exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear venta")
            print("2. Leer venta")
            print("3. Actualizar venta")
            print("4. Eliminar venta")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_sale(cur)
            elif choice == '2':
                read_sale(cur)
            elif choice == '3':
                update_sale(cur)
            elif choice == '4':
                delete_sale(cur)
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