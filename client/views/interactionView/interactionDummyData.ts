import { ProductProps } from 'components/Interaction/SwiperItem/interface';

// Category Interface는 민지님께서 작성해주신다고 하셔서, 임시 선언입니다.
export interface Category{
  categoryId: string;
  categoryName: string;
}

export const InteractionDummyData: ProductProps[] = [
  {
    productId: 1,
    productName: '린넨 여성 롱 원피스',
    productImages: {
      url: 'https://ccimg.hellomarket.com/images/2018/item/08/09/23/0243_3334803_1.jpg?size=s6',
      width: 120,
      height: 120,
    },
    salePrice: 19100,
  },
  {
    productId: 2,
    productName: 'USB 8기가',
    productImages: {
      url: 'https://ae01.alicdn.com/kf/HTB1xMtxNXXXXXXDapXXq6xXFXXXK/Usb-3-0-usb-8-16-32-64-pendrive.jpg',
      width: 120,
      height: 120,
    },
    salePrice: 4600,
  },
  {
    productId: 3,
    productName: '신라면 ',
    productImages: {
      url: 'https://www.costco.co.kr/medias/sys_master/images/h55/h6e/9868094472222.jpg',
      width: 400,
      height: 650,
    },
    salePrice: 733,
  },
  {
    productId: 4,
    productName: '201 더 페인티드 베일, 루즈 아 레브르 브왈 립스틱',
    productImages: {
      url: 'https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1554383704/586169_9PLP8_9201_001_100_0000_Light-201.jpg',
      width: 350,
      height: 520,
    },
    salePrice: 49000,
  },
  {
    productId: 5,
    productName: '본투리드 수면양말',
    productImages: {
      url: 'https://image.aladin.co.kr/product/17338/68/cover500/g102439212_1.jpg',
      width: 300,
      height: 330,
    },
    salePrice: 3100,
  },
];

export const SelectedCategoryDummyData: Category[] = [
  {
    categoryId: '50000808',
    categoryName: '스커트',
  },
  {
    categoryId: '50000815',
    categoryName: '재킷',
  },
  {
    categoryId: '50000806',
    categoryName: '카디건',
  },
];
