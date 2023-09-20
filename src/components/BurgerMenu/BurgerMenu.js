import './BurgerMenu.css';

function BurgerMenu({isOpen, onClick}) {
    const burgerButton = `header__burger-menu-button ${isOpen ? 'header__burger-menu-button_close' : 'header__burger-menu-button'}`;

    return (
        <>
            <button
                type='button'
                className={burgerButton}
                onClick={onClick}
            />
        </>
    );
}

export default BurgerMenu;