import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [];
  private id = 1;

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: this.id,
      marca: createCarDto.marca,
      modelo: createCarDto.modelo,
      ano: createCarDto.ano,
    };
    this.id = this.id + 1;

    this.cars.push(newCar);

    return newCar;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException('Carro não encontrado');
    }
    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const car = this.findOne(id);

    car.marca = updateCarDto.marca;
    car.modelo = updateCarDto.modelo;
    car.ano = updateCarDto.ano;

    return;
  }

  remove(id: number) {
    this.findOne(id);

    const carIndex = this.cars.findIndex((car) => car.id === id);

    this.cars.splice(carIndex, 1);
    return;
  }
}
