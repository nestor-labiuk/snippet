import './adminUsers.css'
import { useEffect, useState } from 'react'
import CardsUsers from '../../components/Cards-Users/CardsUsers'
import Button from '../../components/Button/Button'

const AdminUsers = () => {
  const [users, setUsers] = useState([])


// para paginacion
  const [currentUsers, setCurrentUsers] = useState(0)
  const [totalUsers, setTolalUsers] = useState(0)
// 


  const bringUsers = async (from) => {
    const res = await fetch(`http://localhost:8080/api/users?from=${from}`)
    const data = await res.json()
    setTolalUsers(data.total)
    setUsers(data.users)
    console.log(data.total)
    console.log(data)
    console.log(data.message)
    console.log(data.users)
    console.log(data.users[0])
  }

// para páginacion
  const handleNexPage = async () => {
    if(totalUsers > currentUsers + 10)
    setCurrentUsers(currentUsers => currentUsers + 10)
  }
  const handlePrevPage = async () => {
    if (currentUsers > 10) {
      setCurrentUsers(currentUsers => currentUsers - 10)
    }else{
      setCurrentUsers(currentUsers => currentUsers = 0)
    }
  }
  useEffect(() => {
    bringUsers(currentUsers)
  }, [currentUsers])
// 


  return (
    <main className='admin-main p-3'>
      <h1 className='text-center pb-3 p-4'>Clientes</h1>
      <section className='cards-container'>
        {
          users.length === 0
            ? <h2 className=''>Cargando Clientes ...</h2>
            : users.map((user) => {
              const { id, name, phoneNumber, adress, email, isActive, isAdmin } = user
              return (
                <CardsUsers
                  key={id}
                  id={id}
                  name={name}
                  phoneNumber={phoneNumber}
                  adress={adress}
                  email={email}
                  isActive={isActive}
                  isAdmin={isAdmin}
                />
              )
            })
        }
      </section>

{/* para paginacion */}
      <div className='mt-5 mb-3 justify-content-end '>
        <Button name='Anterior' function={handlePrevPage}></Button>
        <Button name='Siguiente' function={handleNexPage}></Button>
      </div>
{/*  */}


    </main>
  )
}

export default AdminUsers
