import { INavItem } from '@/interfaces';

export const hasActiveChild = (item: INavItem) => {
  if (item.isCurrent) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child));
  }
  return false;
};
