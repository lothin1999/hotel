import { Suite } from '@prisma/client';
import { SuiteResponse } from '../responses/suite.response';

export class SuiteMapper {
  static toResponse(suite: Suite): SuiteResponse {
    let parsedTags: string[] = [];
    try {
      parsedTags = JSON.parse(suite.tags || '[]');
    } catch {
      parsedTags = suite.tags ? suite.tags.split(',') : [];
    }

    return {
      id: suite.id,
      no: suite.no,
      name: suite.name,
      size: suite.size,
      price: suite.price,
      image: suite.image,
      badge: suite.badge,
      tags: parsedTags,
      detail: suite.detail,
      description: suite.description,
    };
  }

  static toResponseCollection(suites: Suite[]): SuiteResponse[] {
    return suites.map(suite => this.toResponse(suite));
  }
}
