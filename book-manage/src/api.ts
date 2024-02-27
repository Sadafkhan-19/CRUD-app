import { ps_connection } from "./pscale_connection";
import {cors_headers} from "./cores_headers"

export const listOfBooks =async (req: Request | any, env: any, ctx: any): Promise<Response> => {
    try{
    const books: any = await ps_connection().execute(`SELECT * FROM books`)

    const data = books.rows
     
    return new Response(JSON.stringify({
        data
    }), {
        headers: { ...cors_headers }
    });
}  catch (error) {
    return new Response('Internal Server Error', { status: 500 });
}
}

export const addBook = async (req: Request | any, env: any, ctx: any): Promise<Response> => {
    try {
        

        const { id, title, author, published_date } = await req.json();

        await ps_connection().execute(
            'INSERT INTO books (id, title, author, published_date) VALUES (?,?,?,?)',
            [id, title, author, published_date]
        );

        return new Response(JSON.stringify({
            message: 'Book added successfully'
        }), {
        headers: { ...cors_headers }
    });
}
catch (error) {
    return new Response('Internal Server Error', { status: 500 });
}
}

export const updateBook = async (req: Request | any, env: any, ctx: any): Promise<Response> => {
    try {
        const { id } = req.params;
      const { title, author, published_date } = await req.json();
  
      await ps_connection().execute(
        'UPDATE books SET title=?, author=?, published_date=? WHERE id=?',
        [title, author, published_date, id]
      );
  
      return new Response(JSON.stringify({
        message: 'Book updated successfully'
      }), {
        headers: { ...cors_headers }
      });
    } catch (error) {
      
      return new Response(JSON.stringify({
        error: 'Internal Server Error'
      }), {
        status: 500,
        headers: { ...cors_headers }
      });
    }
  };

  export const patchBook = async (req: Request | any, env: any, ctx: any): Promise<Response> => {
    try {
       
        const { id } = req.params;

        const { title, author, published_date } = await req.json();

        const setClause = [];
        const updateValues = [];
        if (title) {
            setClause.push('title = ?');
            updateValues.push(title);
        } 
          
        if (author) {
            setClause.push('author = ?');
            updateValues.push(author);
        }
        if (published_date) {
            setClause.push('published_date = ?');
            updateValues.push(published_date);
        } 


        if (setClause.length > 0) {
            const updateQuery = `UPDATE books SET ${setClause.join(', ')} WHERE id = ?`;
            await ps_connection().execute(updateQuery, [...updateValues, id]);
        }

       
        return new Response(JSON.stringify({
            message: 'Book patched successfully'
        }), {
            headers: { ...cors_headers }
        });
    } catch (error) {
       
        console.error('Error in patchBook:', error);

       
        return new Response(JSON.stringify({
            error: 'Internal Server Error'
        }), {
            status: 500,
            headers: { ...cors_headers }
        });
    }
};

export const deleteBook = async (req: Request | any, env: any, ctx: any): Promise<Response> => {
    try {
        const { id } = req.params;

        const deleteQuery = 'DELETE FROM books WHERE id = ?';
        await ps_connection().execute(deleteQuery, [id]);

        return new Response(JSON.stringify({
            message: 'Book deleted successfully'
        }), {
            headers: { ...cors_headers }
        });
    } catch (error) {
        console.error('Error in deleteBook:', error);

        return new Response(JSON.stringify({
            error: 'Internal Server Error'
        }), {
            status: 500,
            headers: { ...cors_headers }
        });
    }
};