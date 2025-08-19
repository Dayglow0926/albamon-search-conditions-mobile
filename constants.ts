import type { FilterCategory } from './types';

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'area',
    title: '근무지역',
    limit: 3,
    options: [],
  },
  {
    id: 'jobType',
    title: '업직종',
    limit: 3,
    options: [
      { id: 'cafe', label: '카페·디저트' },
      { id: 'restaurant', label: '음식점' },
      { id: 'retail', label: '매장관리·판매' },
      { id: 'service', label: '서비스' },
      { id: 'office', label: '사무보조' },
      { id: 'delivery', label: '운전·배달' },
    ],
  },
  {
    id: 'workPeriod',
    title: '근무기간',
    limit: 6,
    options: [
      { id: '1day', label: '하루(1일)' },
      { id: '1week', label: '1주일 이하' },
      { id: '1month', label: '1개월' },
      { id: '3months', label: '3개월' },
      { id: '6months', label: '6개월' },
      { id: '1year', label: '1년 이상' },
    ],
  },
  {
    id: 'workDay',
    title: '근무요일',
    limit: 7,
    options: [
      { id: 'mon', label: '월' },
      { id: 'tue', label: '화' },
      { id: 'wed', label: '수' },
      { id: 'thu', label: '목' },
      { id: 'fri', label: '금' },
      { id: 'sat', label: '토' },
      { id: 'sun', label: '일' },
    ],
  },
];