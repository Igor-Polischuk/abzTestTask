import abzService from '../../services/abzService'
import Card from '../card/Card'
import Spiner from '../spiner/Spiner'

import './users.scss'
import { useState, useEffect } from 'react'

export default function Users() {
    const [users, setUsers] = useState([])
    const [usersEnd, setUsersEnd] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [page, setPage] = useState(1)
    const { get, loading } = abzService()

    const onRequest = (page, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        get(page).then(onUsersLoaded)
    }

    const onUsersLoaded = newUsers => {
        const ended = newUsers.next === null
        setUsers(oldUsers => [...oldUsers, ...newUsers.users])
        setPage(page => page + 1)
        setUsersEnd(ended)
    }

    useEffect(() => {
        onRequest(page, true)
    }, [])

    const spiner = loading && !newItemLoading ? <Spiner /> : null

    return (
        <section className="users users_section">
            <div className="container">
                <h2 className='users__title title'>Working with GET request</h2>
                {spiner}
                <ul className="users__list">
                    {users.map(({ name, email, position, phone, photo }, i) => <Card
                        key={i}
                        photo={photo}
                        name={name}
                        position={position}
                        email={email}
                        phone={phone} />)}
                </ul>
                {!usersEnd && <button onClick={() => onRequest(page)} className='button users__button' disabled={loading}>Show more</button>}
            </div>
        </section>
    )
}