import { Entity } from 'src/common/entity';
import { Expose } from 'class-transformer';
import { CountryEntity } from 'src/students/entities/country.entity';

export class StudentEntity extends Entity {
    countries: any[];

    @Expose({ name: 'countries' })
    get getCountries() {
        return this.countries.map((country) => new CountryEntity(country.country));
    }
}
