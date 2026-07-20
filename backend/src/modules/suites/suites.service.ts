import { Injectable, NotFoundException } from '@nestjs/common';
import { Suite } from '@prisma/client';
import { SuitesRepository } from './suites.repository';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';

@Injectable()
export class SuitesService {
  constructor(private suitesRepository: SuitesRepository) {}

  async create(createSuiteDto: CreateSuiteDto): Promise<Suite> {
    return this.suitesRepository.create(createSuiteDto);
  }

  async findById(id: number): Promise<Suite> {
    const suite = await this.suitesRepository.findById(id);
    if (!suite) {
      throw new NotFoundException(`Suite with ID ${id} not found`);
    }
    return suite;
  }

  async findAll(): Promise<Suite[]> {
    return this.suitesRepository.findAll();
  }

  async update(id: number, updateSuiteDto: UpdateSuiteDto): Promise<Suite> {
    await this.findById(id);
    return this.suitesRepository.update(id, updateSuiteDto);
  }

  async remove(id: number): Promise<Suite> {
    await this.findById(id);
    return this.suitesRepository.delete(id);
  }
}
