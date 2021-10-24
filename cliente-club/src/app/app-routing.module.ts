import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/AdminPages/home/home.component';
import { BuscarSocioComponent } from './components/AdminPages/Socios/buscar-socio/buscar-socio.component';
import { AgregarSocioComponent } from './components/AdminPages/Socios/agregar-socio/agregar-socio.component';
import {AuthGuard} from './auth.guard';
import { AgregarAdminComponent } from './components/AdminPages/Admin/agregar-admin/agregar-admin.component';
import { BuscarAdminComponent } from './components/AdminPages/Admin/buscar-admin/buscar-admin.component';
import { AgregarActividadComponent } from './components/AdminPages/Actividad/agregar-actividad/agregar-actividad.component';
import { BuscarActividadComponent } from './components/AdminPages/Actividad/buscar-actividad/buscar-actividad.component';
import { AgregarInstructorComponent } from './components/AdminPages/Instructores/agregar-instructor/agregar-instructor.component';
import { BuscarInstructorComponent } from './components/AdminPages/Instructores/buscar-instructor/buscar-instructor.component';
import { HomeSocioComponent } from './components/SocioPages/home-socio/home-socio.component';
import { AgregarClaseComponent } from './components/AdminPages/Clases/agregar-clase/agregar-clase.component';
import { BuscarClaseComponent } from './components/AdminPages/Clases/buscar-clase/buscar-clase.component';
import { CalendarioComponent } from './components/SocioPages/calendario/calendario.component';
import { MiPerfilComponent } from './components/SocioPages/mi-perfil/mi-perfil.component';
import { NovedadesComponent } from './components/SocioPages/novedades/novedades.component';
import { MisActividadesComponent } from './components/SocioPages/mis-actividades/mis-actividades.component';


const routes: Routes = [
	{
		path: '',
		redirectTo: 'usuarios/ingresar',
		pathMatch: 'full',
	},
	{
		path: 'usuarios/ingresar',
		component: LoginComponent
	},
	{
		path: 'socio/home',
		component: HomeSocioComponent,
		canActivate: [AuthGuard]
	},

		//AdminPage
	{
		path: 'admin/home',
		component: HomeComponent,
		canActivate: [AuthGuard]
	},

		//AdminPage - Socio Sector

	{
		path: 'admin/buscarSocio',
		component: BuscarSocioComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/agregarSocio',
		component: AgregarSocioComponent,
		canActivate: [AuthGuard]
	},
	{
        path: 'admin/eliminarSocio/{Numero_Usuario}',
        component: BuscarSocioComponent
    },
	{
        path: 'admin/modificarSocio/{Numero_Usuario}',
        component: BuscarSocioComponent
    },

		//AdminPage - Admin Sector
	{
		path: 'admin/buscarAdmin',
		component: BuscarAdminComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/agregarAdmin',
		component: AgregarAdminComponent,
		canActivate: [AuthGuard]
	},
	{
        path: 'admin/eliminarAdmin/{Numero_Usuario}',
        component: BuscarAdminComponent
    },
	{
        path: 'admin/modificarAdmin/{Numero_Usuario}',
        component: BuscarAdminComponent
    },

		//AdminPage - Actividades Sector
	{
		path: 'admin/buscarActividad',
		component: BuscarActividadComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/agregarActividad',
		component: AgregarActividadComponent,
		canActivate: [AuthGuard]
	},
	{
        path: 'admin/eliminarActividad/{id}',
        component: BuscarActividadComponent
    },
	{
        path: 'admin/modificarActividad/{id}',
        component: BuscarActividadComponent
    },

		//AdminPage - Instructores Sector
	{
		path: 'admin/buscarInstructor',
		component: BuscarInstructorComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/agregarInstructor',
		component: AgregarInstructorComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/eliminarInstructor/{id}',
		component: BuscarInstructorComponent
	},
	{
		path: 'admin/modificarInstructor/{id}',
		component: BuscarInstructorComponent
	},

		//AdminPage - Clases Sector
	{
		path: 'admin/buscarClase',
		component: BuscarClaseComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/agregarClase',
		component: AgregarClaseComponent,
		canActivate: [AuthGuard]
	},

		//SocioPage - Calendar
	{
		path: 'socio/calendar',
		component: CalendarioComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'socio/misactividades',
		component: MisActividadesComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'socio/miperfil',
		component: MiPerfilComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'socio/novedades',
		component: NovedadesComponent,
		canActivate: [AuthGuard]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
