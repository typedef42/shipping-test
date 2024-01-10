export interface Mapper<DomainEntity, ResponseDto> {
  toResponse(entity: DomainEntity): ResponseDto;
  toResponses(entities: Array<DomainEntity>): Array<ResponseDto>;
}
