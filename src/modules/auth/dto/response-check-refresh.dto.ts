class RolesProps {
  value: string;
  type: string;
}
class RefreshProps {
  id: string;
  expiration: string;
}

export class ResponseCheckRefreshDto {
  id: string;
  active: boolean;
  roles: RolesProps[];
  refresh: RefreshProps[];
}
