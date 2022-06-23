import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faCloudArrowUp, faMessage, faUser, faCoins, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiMessageAltMinus } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import image from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
	{
		icon: <FontAwesomeIcon icon={faEarthAsia} />,
		title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English'
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt'
        }
      ]
    }
	},
	{
		icon: <FontAwesomeIcon icon={faCircleQuestion} />,
		title: 'Feedback and help',
		to: '/feedback'
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard} />,
		title: 'Keyboard shortcuts'
	}
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const currentUser = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([])
    }, 0)
  }, []) 

  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        // Handle language
        break
      default:
    }
  }

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@nva'
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin'
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings'
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ]

  return (  
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={image.logo} alt='Tiktok' />

        <HeadlessTippy
          interactive
          visible={searchResult.length > 0 ? true : false}
          render={attrs => (
            <div className={cx('search-result')} tabIndex='-1' {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder='Search accounts and videos' spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Tippy 
                delay={[0, 200]}
                content='Upload video' 
                placement='bottom'
              >
                <button className={cx('action-btn')}>
                  <AiOutlineCloudUpload />
                  {/* <FontAwesomeIcon icon={faCloudArrowUp} /> */}
                </button>
              </Tippy>
              <button className={cx('action-btn')}>
                <BiMessageAltMinus />
                {/* <FontAwesomeIcon icon={faMessage} /> */}
              </button>
            </>
          ) : (
            <>
              <Button>Upload</Button>
              <Button primary>Login</Button>
            </>
          )}              
          <Menu
            items={ currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <img 
                src='https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/1639039023536129.jpeg?x-expires=1656136800&x-signature=JkzsJJL6WPdD0KkQMAqkBabUwVo%3D'
                className={cx('user-avatar')} 
                alt='Nguyen Van A' 
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>

      </div>
    </header>       
  );
}

export default Header;        