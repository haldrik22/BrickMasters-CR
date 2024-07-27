import cx_Oracle
from datetime import datetime

def create_supplier_product(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor: "))
    id_producto = int(input("Ingrese el ID del producto: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_CREATE_SP", [id_proveedor, id_producto, creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Relación proveedor-producto creada exitosamente.")

def read_supplier_product(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor a consultar: "))
    id_producto = int(input("Ingrese el ID del producto a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_READ_SP", [id_proveedor, id_producto, result])
    
    for row in result.getvalue():
        print(row)

def update_supplier_product(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor a actualizar: "))
    id_producto = int(input("Ingrese el ID del producto a actualizar: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_UPDATE_SP", [id_proveedor, id_producto, modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Relación proveedor-producto actualizada exitosamente.")

def delete_supplier_product(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor a eliminar: "))
    id_producto = int(input("Ingrese el ID del producto a eliminar: "))
    
    cur.callproc("FIDE_PROVEEDORES_PRODUCTO_DELETE_SP", [id_proveedor, id_producto])
    cur.connection.commit()
    
    print("Relación proveedor-producto eliminada exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear relación proveedor-producto")
            print("2. Leer relación proveedor-producto")
            print("3. Actualizar relación proveedor-producto")
            print("4. Eliminar relación proveedor-producto")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_supplier_product(cur)
            elif choice == '2':
                read_supplier_product(cur)
            elif choice == '3':
                update_supplier_product(cur)
            elif choice == '4':
                delete_supplier_product(cur)
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