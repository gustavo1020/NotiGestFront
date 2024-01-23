import { Autor } from './autor'

export interface Noticias {
    id : string
    createdDate : Date,
    lastUpdateDate : Date,
    fechaBaja : Date,
    titulo : string,
    contenido : string,
    autor : Autor, 
    destacada: boolean
    enlaceImagen : string
}
