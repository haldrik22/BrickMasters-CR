import cx_Oracle
from datetime import datetime

def create_discount_type(cur):
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento: "))
    id_cliente = int(input("Ingrese el ID del cliente: "))
    id_estado = int(input("Ingrese el ID del estado: "))
    porcentaje_descuento = float(input("Ingrese el porcentaje de descuento: "))
    creado_por = input("Ingrese el nombre de quien crea el registro: ")
    fecha_creacion = datetime.now().strftime("%Y-%m-%d")
    accion = "CREATE"
    
    cur.callproc("FIDE_TIPO_DESCUENTO_CREATE_SP", [id_tipo_descuento, id_cliente, id_estado, porcentaje_descuento,
                                                   creado_por, fecha_creacion, accion])
    cur.connection.commit()
    
    print("Tipo de descuento creado exitosamente.")

def read_discount_type(cur):
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento a consultar: "))
    
    result = cur.var(cx_Oracle.CURSOR)
    cur.callproc("FIDE_TIPO_DESCUENTO_READ_SP", [id_tipo_descuento, result])
    
    for row in result.getvalue():
        print(row)

def update_discount_type(cur):
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento a actualizar: "))
    id_cliente = int(input("Ingrese el nuevo ID del cliente: "))
    id_estado = int(input("Ingrese el nuevo ID del estado: "))
    porcentaje_descuento = float(input("Ingrese el nuevo porcentaje de descuento: "))
    modificado_por = input("Ingrese el nombre de quien modifica el registro: ")
    fecha_modificacion = datetime.now().strftime("%Y-%m-%d")
    accion = "UPDATE"
    
    cur.callproc("FIDE_TIPO_DESCUENTO_UPDATE_SP", [id_tipo_descuento, id_cliente, id_estado, porcentaje_descuento,
                                                   modificado_por, fecha_modificacion, accion])
    cur.connection.commit()
    
    print("Tipo de descuento actualizado exitosamente.")

def delete_discount_type(cur):
    id_tipo_descuento = int(input("Ingrese el ID del tipo de descuento a eliminar: "))
    
    cur.callproc("FIDE_TIPO_DESCUENTO_DELETE_SP", [id_tipo_descuento])
    cur.connection.commit()
    
    print("Tipo de descuento eliminado exitosamente.")

try:
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDB/123@localhost:1521/orclpdb')
except Exception as err:
    print('Error al crear la conexión:', err)
else:
    try:
        cur = conn.cursor()
        
        while True:
            print("\nSeleccione una operación:")
            print("1. Crear tipo de descuento")
            print("2. Leer tipo de descuento")
            print("3. Actualizar tipo de descuento")
            print("4. Eliminar tipo de descuento")
            print("5. Salir")
            
            choice = input("Ingrese su elección (1-5): ")
            
            if choice == '1':
                create_discount_type(cur)
            elif choice == '2':
                read_discount_type(cur)
            elif choice == '3':
                update_discount_type(cur)
            elif choice == '4':
                delete_discount_type(cur)
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