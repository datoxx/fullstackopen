import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
   
import { all_books_with_genres, ME } from '../queries'

    
    const Recommend = ({show}) => {
        const user = useQuery(ME)
        const [getFavoriteBooks, result] = useLazyQuery(all_books_with_genres)
        const [favoriteBooks, setFavoriteBooks] = useState([])

        useEffect(() => {
            if (result.data) {
              setFavoriteBooks(result.data.allBooks)
            }
          }, [setFavoriteBooks, result])

        useEffect(() =>{
            if(user.data) {
                getFavoriteBooks({variables: {genre: user.data.me.favoriteGenre}})
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [getFavoriteBooks])


        

        if (!show) {
            return null
          }

        return ( 
            <div>
                <h1>Recommendations</h1>
                <h3>books in your favorite genre <i>patterns</i></h3>
                <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {favoriteBooks.map((a) => (
                        <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
         );
    }
     
    export default Recommend;