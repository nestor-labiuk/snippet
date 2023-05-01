import React, { useEffect, useState } from 'react'
import './adminMenu.css'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import AdmMenuCard from '../../components/AdmMenuCard/AdmMenuCard'

function AdminMenu() {
  const dataJSON = sessionStorage.getItem('loguedUser')
  const data = JSON.parse(dataJSON)

  // console.log(data.accesstoken)
  const juancito = data?.accesstoken

  const [menus, setMenus] = useState([])
  const fetchMenus = async () => {
    const response = await fetch('http://localhost:8080/api/menu',{
      method: 'GET',
      headers: {
        'accesstoken': `${juancito} `


      }
    })
    const data = await response.json()
    setMenus(data.menus)
  }

  useEffect(() => {
    fetchMenus()
  }, [])


  return (
    <main className='mx-0 pt-5 adminMenu'>
      <h1 className='text-center pb-3 '>Menú Admin</h1>
      <div className='mx-3'>
        <tr className="d-flex justify-content-center">
          <th className='border border-black col-4 text-center col-sm-2'>Nombre</th>
          <th className='border border-black col-2 text-center borrar'>Estado</th>
          <th className='border border-black col-1 text-center borrar'>$</th>
          <th className='border border-black col-2 text-center borrar'>Detalle</th>
          <th className='border border-black col-2 text-center borrar'>Categoría</th>
          <th className='border border-black col-4 text-center col-sm-2'>Imagen</th>
          <th className='border border-black col-4 text-center col-sm-1'>Opc</th>
        </tr>
      </div>
      <div className='colorBack' >

      {
        menus?.length === 0 || menus === undefined
          ? <h3 className='mt-5 text-white text-center'> Cargando Menús... </h3>
          : menus?.map((menu) => (<AdmMenuCard key={menu._id} {...menu} />))
      }    
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <div className='d-flex justify-content-around main-admin-buttons mt-2 mb-5'>
          <Link to='/admin/menu/registermenu'><Button name='Nuevo Menú'/></Link>
        </div>
        <div className='d-flex justify-content-around main-admin-buttons mb-3'>
          <Link to='/'><Button name='Clientes'/></Link>
          <Link to='/'><Button name='Pedidos'/></Link>
        </div>
      </div>
    </main>
  )
}

export default AdminMenu
