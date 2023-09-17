import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' title='about-project'>
      <div className='about-project__heading'>
        <h2 className='about-project__heading-title'>О проекте</h2>
      </div>
      <div className='about-project__items'>
        <div className='about-project__item'>
          <h3 className='about-project__item-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__item-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__item'>
          <h3 className='about-project__item-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__item-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__grid-container'>
        <div className='about-project__grid'>
          <div className='about-project-title about-project-title_type_green'>
            <p className='about-project__grid-title'>1 неделя</p>
          </div>
          <p className='about-project__grid-subject'>Back-end</p>
        </div>
        <div className='about-project__grid'>
          <div className='about-project-title about-project-title_type_transparent'>
            <p className='about-project__grid-title'>4 недели</p>
          </div>
          <p className='about-project__grid-subject'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;