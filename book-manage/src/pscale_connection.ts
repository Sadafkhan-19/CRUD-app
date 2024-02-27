import { connect, Client } from '@planetscale/database'




export const ps_connection = () => {
  const config = {
    database: "testdb",
    host: 'clouds',
    username: 'sadaf',
    password: 'pass',
    fetch: (url: string, init: RequestInit<RequestInitCfProperties>) => {
      delete (init as any)["cache"]; // Remove cache header
      return fetch(url, init);
    }
  
  }
  
  return connect(config)
}

