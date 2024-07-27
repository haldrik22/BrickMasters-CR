import subprocess

def run_script(script_name):
    try:
        subprocess.run(['python', script_name], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error ejecutando script: {e}")

def main():
    INVALID_OPTION_MESSAGE = "Opcion invalida. Por favor ingrese una opcion valida."

    
    print("Bienvenido a la interfaz de desarrollador/admin en Python de BrickMasters!")
    print("Seleccione el tipo de script que desea correr:")
    print("1. Vistas")
    print("2. Procedimientos Almacenados")
    print("3. Funciones")
    opcion = input("Elija una opcion (1/2/3): ")

    if opcion == '1':
        print("Elija una vista a mostrar:")
        scripts_vistas = [
            "vistas/vClientesDescuentosEntregas.py",
            "vistas/vEntregasClientesContacto.py",
            "vistas/vLocalesProductos.py",
            "vistas/vProductosProveedores.py",
            "vistas/vTipoDescuentosClientes.py"
        ]
        for i, script in enumerate(scripts_vistas, start=1):
            print(f"{i}. {script}")
        vistas_opcion = int(input("Opcion: "))
        if 1 <= vistas_opcion <= len(scripts_vistas):
            run_script(scripts_vistas[vistas_opcion - 1])
        else:
            print(INVALID_OPTION_MESSAGE)

    elif opcion == '2':
        print("Elija un procedimiento almacenado a ejecutar:")
        scripts_procedimientos = [
            "procedimientos/crudCatalogo.py",
            "procedimientos/crudClientes.py",
            "procedimientos/crudDescuentos.py",
            "procedimientos/crudEstado.py",
            "procedimientos/crudFacturacion.py",
            "procedimientos/crudLocales.py",
            "procedimientos/crudProductos.py",
            "procedimientos/crudProveedores.py",
            "procedimientos/crudProveedoresProducto.py",
            "procedimientos/crudTipoDescuento.py",
            "procedimientos/crudVentas.py"
        ]
        for i, script in enumerate(scripts_procedimientos, start=1):
            print(f"{i}. {script}")
        procedimientos_opcion = int(input("Opcion: "))
        if 1 <= procedimientos_opcion <= len(scripts_procedimientos):
            run_script(scripts_procedimientos[procedimientos_opcion - 1])
        else:
            print(INVALID_OPTION_MESSAGE)

    elif opcion == '3':
        run_script("funciones/scriptFunciones.py")

    else:
        print(INVALID_OPTION_MESSAGE)

if __name__ == "__main__":
    main()