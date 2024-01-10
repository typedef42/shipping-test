export class PortResponseDto {
  name: string;
  country: string;

  constructor(name: string, country: string) {
    this.name = name;
    this.country = country;
  }
}
