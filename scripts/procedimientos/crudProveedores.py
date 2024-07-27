import cx_Oracle
from datetime import datetime

def create_supplier(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor: "))
    nom_proveedor = input("Ingrese el nombre del proveedor: ")
    correo_proveedor = input("Ingrese el correo del proveedor: ")
    producto_proveedor = input("Ingrese el producto del proveedor: ")
    tel_proveedor = input("Ingrese el teléfono del proveedor: ")
    direccion_proveedor = input("Ingrese la dirección del proveedor: ")
    id_estado = int(input("Ingrese el ID del estado: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_PROVEEDORES_CREATE_SP", [id_proveedor, nom_proveedor, correo_proveedor, producto_proveedor,
                                                tel_proveedor, direccion_proveedor, id_estado, creado_por,
                                                fecha_creacion, accion])
    cur.connection.commit()
    
    print("Proveedor creado exitosamente.")

def read_supplier(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_PROVEEDORES_READ_SP", [id_proveedor, result])
    
    for row in result.getvalue():
        print(row)

def update_supplier(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor a actualizar: "))
    nom_proveedor = input("Ingrese el nuevo nombre del proveedor: ")
    correo_proveedor = input("Ingrese el nuevo correo del proveedor: ")
    producto_proveedor = input("Ingrese el nuevo producto del proveedor: ")
    tel_proveedor = input("Ingrese el nuevo teléfono del proveedor: ")
    direccion_proveedor = input("Ingrese la nueva dirección del proveedor: ")
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_PROVEEDORES_UPDATE_SP", [id_proveedor, nom_proveedor, correo_proveedor, producto_proveedor,
                                                tel_proveedor, direccion_proveedor, id_estado, modificado_por,
                                                fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Proveedor actualizado exitosamente.")

def delete_supplier(cur):
    id_proveedor = int(input("Ingrese el ID del proveedor a eliminar: "))
    
    cur.callproc("FIDE_PROVEEDORES_DELETE_SP", [id_proveedor])
    cur.connection.commit()
    
    print("Proveedor eliminado exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear proveedor")
            print("2. Leer proveedor")
            print("3. Actualizar proveedor")
            print("4. Eliminar proveedor")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_supplier(cur)
            elif choice == '2':
                read_supplier(cur)
            elif choice == '3':
                update_supplier(cur)
            elif choice == '4':
                delete_supplier(cur)
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