import { EntityRepository, Repository } from 'typeorm';
import { Survey } from '../models/Survey';

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {

}

export { SurveyRepository };
