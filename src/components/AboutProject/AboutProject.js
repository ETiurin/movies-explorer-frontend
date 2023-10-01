
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about" id="about-project">
      <div className="container">
        <h2 className='about__text-title'>О проекте</h2>
        <div className="about__text-container">
          <div className="about__text">
            <h3 className="about__text-title">Дипломный проект включал 5 этапов</h3>
            <p className="about__text-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about__text">
            <h3 className="about__text-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__text-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about__scale-container">
          <div className="about__scale about__scale_small">
            <p className="about__scale-title about__scale-title_color_black">1 неделя</p>
            <p className="about__scale-caption">Back-end</p>
          </div>
          <div className="about__scale">
            <p className="about__scale-title">4 недели</p>
            <p className="about__scale-caption">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;