# servidor-Club

CREATE DATABASE IF NOT EXISTS club;
USE club;

CREATE TABLE IF NOT EXISTS Estados(
Id_Estado INT NOT NULL AUTO_INCREMENT,
Descripcion_Estado VARCHAR(20) NOT NULL,
PRIMARY KEY (Id_Estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Roles(
Id_Rol INT NOT NULL AUTO_INCREMENT,
Descripcion_Rol VARCHAR(20) NOT NULL,
PRIMARY KEY (Id_Rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Usuarios(
Numero_Usuario VARCHAR(10) NOT NULL,
Nombre_Usuario VARCHAR(20) NOT NULL,
Apellido_Usuario VARCHAR(20) NOT NULL,
DNI_Usuario INT NOT NULL,
Mail_Usuario VARCHAR(50) DEFAULT NULL,
Telefono_Usuario INT NOT NULL,
Direccion_Usuario VARCHAR(50) NOT NULL,
FechaCreacion_Usuario TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
Password_Usuario VARCHAR(50) NOT NULL,
Id_Rol INT NOT NULL,
Id_Estado INT NOT NULL,
Id_Instructor INT default null UNIQUE ,
PRIMARY KEY (Numero_Usuario),
KEY FK_Socio_Rol (Id_Rol),
KEY FK_Socio_Estado (Id_Estado),
CONSTRAINT FK_Socio_Rol FOREIGN KEY (Id_Rol) REFERENCES Roles (Id_Rol) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT FK_Socio_Estado FOREIGN KEY (Id_Estado) REFERENCES Estados (Id_Estado) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Horarios(
Id_Horario INT NOT NULL AUTO_INCREMENT,
Comienzo_Horario INT NOT NULL,
Finalizacion_Horario INT NOT NULL,
PRIMARY KEY(Id_Horario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Actividades(
Id_Actividad INT NOT NULL AUTO_INCREMENT,
Descripcion_Actividad VARCHAR(20) NOT NULL,
PRIMARY KEY(Id_Actividad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Clases(
Id_Clase INT NOT NULL AUTO_INCREMENT,
Id_Actividad INT NOT NULL,
Id_Horario INT NOT NULL,
Cupo_Clase INT NOT NULL,
Id_Instructor INT NOT NULL,
PRIMARY KEY (Id_Clase),
KEY FK_Clase_Actividad (Id_Actividad),
KEY FK_Clase_Horario (Id_Horario),
KEY FK_Clase_Instructor (Id_Instructor),
CONSTRAINT FK_Clase_Actividad FOREIGN KEY (Id_Actividad) REFERENCES Actividades (Id_Actividad) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT FK_Clase_Horario FOREIGN KEY (Id_Horario) REFERENCES Horarios (Id_Horario) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT FK_Clase_Instructor FOREIGN KEY (Id_Instructor) REFERENCES Usuarios (Id_Instructor) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS SociosClases(
Id_Clase INT NOT NULL,
Numero_Usuario VARCHAR (10) NOT NULL,
KEY FK_Socio_Clase (Id_Clase),
KEY FK_Clase_Socio (Numero_Usuario),
CONSTRAINT FK_Socio_Clase FOREIGN KEY (Id_Clase) REFERENCES Clases (Id_Clase) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT FK_Clase_Socio FOREIGN KEY (Numero_Usuario) REFERENCES Usuarios (Numero_Usuario) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO Roles(Descripcion_Rol) VALUES ('Administrador');
INSERT INTO Roles(Descripcion_Rol) VALUES ('Socio');
INSERT INTO Roles(Descripcion_Rol) VALUES ('Instructor');

INSERT INTO Estados(Descripcion_Estado) VALUES ('Activo');
INSERT INTO Estados(Descripcion_Estado) VALUES ('Inactivo');