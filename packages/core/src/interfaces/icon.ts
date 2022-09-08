export type IIcon =
  | {
      name: string;
      color?: string;
      iconSet?:
        | 'bx'
        | 'bxl'
        | 'bxs'
        | 'fab'
        | 'fad'
        | 'fal'
        | 'far'
        | 'fas'
        | 'material-icons'
        | 'material-icons-outlined'
        | 'material-icons-round'
        | 'material-icons-sharp';
      size?: string;
    }
  | string;
