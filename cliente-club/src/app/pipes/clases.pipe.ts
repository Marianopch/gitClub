import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clases'
})
export class ClasesPipe implements PipeTransform {

  transform(value: any, args: any, page: number = 0): unknown {
    const resultPosts = [];
    for (const usuario of value) {
      if (usuario.Nombre_Usuario.indexOf(args) > -1 || usuario.Apellido_Usuario.indexOf(args) > -1) {
      
        resultPosts.push(usuario);

      };
    };
    return resultPosts.slice(page, page + 10);
  }

}
