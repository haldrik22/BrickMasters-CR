import cx_Oracle
from datetime import datetime

def create_discount(cur):
    id_descuento = int(input("Ingrese el ID del descuento: "))
    id_cliente = int(input("Ingrese el ID del cliente: "))
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_DESCUENTOS_CREATE_SP", [id_descuento, id_cliente, id_tipo_descuento, creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Descuento creado exitosamente.")

def read_discount(cur):
    id_descuento = int(input("Ingrese el ID del descuento a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_DESCUENTOS_READ_SP", [id_descuento, result])
    
    for row in result.getvalue():
        print(row)

def update_discount(cur):
    id_descuento = int(input("Ingrese el ID del descuento a actualizar: "))
    id_cliente = int(input("Ingrese el nuevo ID del cliente: "))
    id_tipo_descuento = int(input("Ingrese el nuevo ID del tipo de descuento: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_DESCUENTOS_UPDATE_SP", [id_descuento, id_cliente, id_tipo_descuento, modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Descuento actualizado exitosamente.")

def delete_discount(cur):
    id_descuento = int(input("Ingrese el ID del descuento a eliminar: "))
    
    cur.callproc("FIDE_DESCUENTOS_DELETE_SP", [id_descuento])
    cur.connection.commit()
    
    print("Descuento eliminado exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear descuento")
            print("2. Leer descuento")
            print("3. Actualizar descuento")
            print("4. Eliminar descuento")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_discount(cur)
            elif choice == '2':
                read_discount(cur)
            elif choice == '3':
                update_discount(cur)
            elif choice == '4':
                delete_discount(cur)
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