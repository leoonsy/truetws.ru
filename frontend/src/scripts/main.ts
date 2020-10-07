import './index/hide-menu';
import './index/wow';
import './index/phone-mask';
import './index/slider';
import './index/changeContainer';
import './index/menu-highlighting';
import './index/buy';
import './index/timer';
import './index/price-loading';
import MicroModal from 'micromodal';

import '@/styles/main.scss';

MicroModal.init();

if (process.env.NODE_ENV === 'development') {
  //можно бы было watchContentBase в dev-server сделать другой вместо этого
  import('@/index.html');
  import('@/policy.html');
}
