import {Router} from "itty-router"
import {listOfBooks, patchBook} from "./api"
import {addBook} from "./api"
import {updateBook} from "./api"
import {deleteBook} from "./api"

export function routes(router: Router<Request, {}>) {

    return (
        router
            .get('/api/v1/', listOfBooks)
            .post('/api/v1/', addBook)
            .put('/api/v1/:id', updateBook)
            .patch('/api/v1/:id', patchBook)
            .delete('/api/v1/:id', deleteBook)

    )
   
}