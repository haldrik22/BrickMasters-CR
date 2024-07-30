import cx_Oracle

try:
    # Intenta establecer una conexión con la base de datos Oracle
    conn = cx_Oracle.connect('G4_PROYECTO_BRICKDBA/123@localhost:1521/orclpdb')
except Exception as err:
    # Maneja errores de conexión
    print('Error al crear la conexión:', err)
else:
    try:
        # Crea un cursor para ejecutar consultas SQL
        cur = conn.cursor()
        # Ejecuta una consulta SELECT en la vista FIDE_ENTREGAS_CLIENTES_CONTACTO_V
        cur.execute('SELECT * FROM FIDE_ENTREGAS_CLIENTES_CONTACTO_V')
        # Obtiene todos los resultados de la consulta
        rows = cur.fetchall()

        # Imprime los nombres de las columnas
        column_names = [col[0] for col in cur.description]
        print("Columnas: ", ", ".join(column_names))
        print("-" * 80)

        # Imprime cada fila de resultados
        for row in rows:
            print(row)
    except Exception as err:
        # Maneja errores durante la ejecución de la consulta
        print('Error al ejecutar la consulta:', err)
    finally:
        # Cierra el cursor, independientemente del resultado
        cur.close()
finally:
    # Cierra la conexión a la base de datos, independientemente del resultado
    conn.close()