import { Injectable, NotFoundException } from '@nestjs/common';
import { Bike } from '@prisma/client';
import { BikesRepository } from './bikes.repository';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(private bikesRepository: BikesRepository) {}

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikesRepository.create(createBikeDto);
  }

  async findById(id: number): Promise<Bike> {
    const bike = await this.bikesRepository.findById(id);
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return bike;
  }

  async findAll(category?: string): Promise<Bike[]> {
    return this.bikesRepository.findAll(category);
  }

  async update(id: number, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    await this.findById(id);
    return this.bikesRepository.update(id, updateBikeDto);
  }

  async remove(id: number): Promise<Bike> {
    await this.findById(id);
    return this.bikesRepository.delete(id);
  }
}
