import { useEffect, useState, type CSSProperties } from "react";

type Locale = "en" | "ja";
type Screen = "welcome" | "map" | "chapter" | "profile" | "challenge" | "result";
type MapMode = "homelands" | "present";
type CustomProperties = CSSProperties & Partial<Record<`--${string}`, string | number>>;

function customProperties(properties: CustomProperties): CSSProperties {
  return properties;
}

export interface Profile {
  slug: string;
  locale: Locale;
  name: string;
  chineseName: string;
  region: string;
  mapLabel: string;
  introduction: string;
  memorableFact: string;
  coordinates: [number, number];
  accent: string;
  reviewStatus: "prototype";
}

interface Props {
  locale: Locale;
  profiles: Profile[];
}

const copy = {
  en: {
    prototype: "PRIVATE PROTOTYPE · 3 OF 17 PROFILES",
    heroTitleA: "One island.",
    heroTitleB: "Many homelands.",
    heroBody:
      "Learn three names and locate their homelands through a short, visual journey across Taiwan.",
    start: "Begin the journey",
    explore: "Explore the map",
    time: "5 MINUTES",
    lesson: "3 PEOPLES",
    orientation: "01 · ORIENTATION",
    mapTitle: "Start with place",
    mapBody: "These markers are memory aids—not borders. Select one to preview a chapter.",
    homeland: "Traditional homelands",
    present: "Present-day distribution",
    guided: "Start guided journey",
    location: "GENERAL LOCATION",
    chapter: "CHAPTER",
    of: "OF",
    meet: "Meet",
    enter: "Enter this chapter",
    backMap: "Back to map",
    pairedView: "A PAIRED VIEW",
    contemporary: "Contemporary community life",
    contemporaryNote: "Rights-cleared photograph reserved",
    cultural: "Community-selected cultural detail",
    culturalNote: "Image and interpretation pending review",
    remember: "REMEMBER THE PLACE",
    next: "Next chapter",
    test: "Test my memory",
    question: "Where would you place",
    choose: "Choose the closest general location.",
    correct: "That’s it",
    retry: "Try once more",
    continue: "Continue",
    resultTitle: "A first map is taking shape.",
    resultBody:
      "You connected names with places—without turning cultures into borders or appearances.",
    score: "LOCATION MATCHES",
    replay: "Take the journey again",
    context: "THE STORY CONTINUES",
    contextTitle: "Official recognition is not the whole story.",
    contextBody:
      "The complete atlas will introduce all officially recognized peoples while clearly acknowledging other Indigenous communities and evolving recognition.",
    upcoming: "14 profiles awaiting research and review",
    notBoundary: "Illustrative marker · not a boundary",
    mapLayerLabel: "Map layer",
    mapAria: "Illustrative map of Taiwan",
    openChapter: "Open {name} chapter",
    memoryMap: "MEMORY MAP",
    journeyComplete: "JOURNEY COMPLETE",
  },
  ja: {
    prototype: "非公開の試作版 · 17プロフィール中3件",
    heroTitleA: "ひとつの島。",
    heroTitleB: "いくつもの故郷。",
    heroBody: "台湾をめぐる短いビジュアル・ジャーニーで、3つの名前と故郷を学びます。",
    start: "旅をはじめる",
    explore: "地図を見る",
    time: "5分",
    lesson: "3つの民族",
    orientation: "01 · 位置を知る",
    mapTitle: "場所からはじめよう",
    mapBody: "マーカーは記憶の手がかりであり、境界線ではありません。選んで章を見てみましょう。",
    homeland: "伝統的な故郷",
    present: "現在の分布",
    guided: "ガイド付きの旅をはじめる",
    location: "おおよその位置",
    chapter: "第",
    of: "/",
    meet: "出会う",
    enter: "この章をひらく",
    backMap: "地図に戻る",
    pairedView: "2つの視点",
    contemporary: "現代のコミュニティの日常",
    contemporaryNote: "使用許可を得た写真を掲載予定",
    cultural: "コミュニティが選ぶ文化的要素",
    culturalNote: "画像と解説は確認後に掲載",
    remember: "場所を覚える",
    next: "次の章へ",
    test: "記憶を試す",
    question: "どの地域と結びつきますか：",
    choose: "最も近いおおよその位置を選んでください。",
    correct: "正解です",
    retry: "もう一度",
    continue: "続ける",
    resultTitle: "最初の地図が見えてきました。",
    resultBody: "文化を境界線や外見に置き換えず、名前と場所を結びつけました。",
    score: "正しい位置",
    replay: "もう一度旅をする",
    context: "物語は続く",
    contextTitle: "公的認定だけが、すべてではありません。",
    contextBody:
      "完成版では、公的に認定されたすべての民族を紹介するとともに、その他の先住民族コミュニティと変化する認定制度も明確に伝えます。",
    upcoming: "14件のプロフィールは調査・確認待ち",
    notBoundary: "位置の目安 · 境界線ではありません",
    mapLayerLabel: "地図レイヤー",
    mapAria: "台湾のおおよその位置を示す地図",
    openChapter: "{name}の章を開く",
    memoryMap: "記憶の地図",
    journeyComplete: "旅の完了",
  },
} as const;

function AtlasMap({
  profiles,
  mode,
  locale,
  onSelect,
}: {
  profiles: Profile[];
  mode: MapMode;
  locale: Locale;
  onSelect: (slug: string) => void;
}) {
  const t = copy[locale];
  return (
    <div className="atlas-map-shell" aria-label={t.mapAria}>
      <div className={`map-fallback map-fallback--${mode}`}>
        <svg viewBox="0 0 260 500" aria-hidden="true">
          <path d="M174 18c-37 24-57 76-67 127-11 54-48 93-62 145-13 47-9 118 22 172 15 26 43 21 59-5 25-40 32-99 55-148 24-52 42-100 43-151 2-58-9-112-28-136-7-9-14-9-22-4Z" />
        </svg>
        {profiles.map((profile) => (
          <button
            key={profile.slug}
            className={`fallback-marker fallback-marker--${profile.slug}`}
            style={customProperties({ "--marker": profile.accent })}
            onClick={() => onSelect(profile.slug)}
            aria-label={t.openChapter.replace("{name}", profile.name)}
          >
            <span />
            <strong>{profile.name}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LearningJourney({ locale, profiles }: Props) {
  const t = copy[locale];
  const [screen, setScreen] = useState<Screen>("welcome");
  const [mode, setMode] = useState<MapMode>("homelands");
  const [activeIndex, setActiveIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const active = profiles[activeIndex];
  const challenge = profiles[challengeIndex];
  const answeredCorrectly = selectedAnswer === challenge?.slug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  function openChapter(slug: string) {
    const index = profiles.findIndex((profile) => profile.slug === slug);
    if (index >= 0) setActiveIndex(index);
    setScreen("chapter");
  }

  function advanceProfile() {
    if (activeIndex < profiles.length - 1) {
      setActiveIndex((current) => current + 1);
      setScreen("chapter");
      return;
    }
    setChallengeIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setScreen("challenge");
  }

  function answer(slug: string) {
    if (selectedAnswer) return;
    setSelectedAnswer(slug);
    if (slug === challenge.slug) setScore((current) => current + 1);
  }

  function advanceChallenge() {
    if (!answeredCorrectly) {
      setSelectedAnswer(null);
      return;
    }
    if (challengeIndex < profiles.length - 1) {
      setChallengeIndex((current) => current + 1);
      setSelectedAnswer(null);
      return;
    }
    setScreen("result");
  }

  function restart() {
    setScreen("welcome");
    setActiveIndex(0);
    setChallengeIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  if (!profiles.length) return null;

  return (
    <section className={`journey journey--${screen}`} aria-live="polite">
      {screen === "welcome" && (
        <div className="hero-screen">
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">{t.prototype}</p>
            <h1>
              <span>{t.heroTitleA}</span> {t.heroTitleB}
            </h1>
            <p className="hero-body">{t.heroBody}</p>
            <div className="hero-actions">
              <button
                className="button button--primary"
                onClick={() => {
                  setActiveIndex(0);
                  setScreen("chapter");
                }}
              >
                {t.start}
                <span aria-hidden="true">↗</span>
              </button>
              <button className="button button--quiet" onClick={() => setScreen("map")}>
                {t.explore}
                <span aria-hidden="true">↓</span>
              </button>
            </div>
            <dl className="hero-meta">
              <div>
                <dt>○</dt>
                <dd>{t.time}</dd>
              </div>
              <div>
                <dt>◒</dt>
                <dd>{t.lesson}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-island" aria-hidden="true">
            <svg viewBox="0 0 260 500">
              <path d="M174 18c-37 24-57 76-67 127-11 54-48 93-62 145-13 47-9 118 22 172 15 26 43 21 59-5 25-40 32-99 55-148 24-52 42-100 43-151 2-58-9-112-28-136-7-9-14-9-22-4Z" />
            </svg>
            <span className="hero-dot hero-dot--one" />
            <span className="hero-dot hero-dot--two" />
            <span className="hero-dot hero-dot--three" />
          </div>
        </div>
      )}

      {screen === "map" && (
        <div className="map-screen">
          <header className="screen-heading">
            <p className="eyebrow">{t.orientation}</p>
            <h1>{t.mapTitle}</h1>
            <p>{t.mapBody}</p>
          </header>
          <div className="layer-toggle" aria-label={t.mapLayerLabel}>
            <button
              className={mode === "homelands" ? "active" : ""}
              onClick={() => setMode("homelands")}
            >
              {t.homeland}
            </button>
            <button
              className={mode === "present" ? "active" : ""}
              onClick={() => setMode("present")}
            >
              {t.present}
            </button>
          </div>
          <div className="map-frame">
            <AtlasMap profiles={profiles} mode={mode} locale={locale} onSelect={openChapter} />
            <span className="map-caveat">{t.notBoundary}</span>
          </div>
          <div className="map-list">
            {profiles.map((profile, index) => (
              <button key={profile.slug} onClick={() => openChapter(profile.slug)}>
                <span className="map-index" style={{ background: profile.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{profile.name}</strong>
                  <small>{profile.mapLabel}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <button
            className="button button--primary button--wide"
            onClick={() => {
              setActiveIndex(0);
              setScreen("chapter");
            }}
          >
            {t.guided}
            <span>→</span>
          </button>
        </div>
      )}

      {screen === "chapter" && (
        <div
          className="chapter-screen"
          style={customProperties({ "--profile-accent": active.accent })}
        >
          <button className="text-back" onClick={() => setScreen("map")}>
            ← {t.backMap}
          </button>
          <div className="chapter-number" aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")}
          </div>
          <div className="chapter-card">
            <p className="eyebrow">
              {t.chapter} {activeIndex + 1} {t.of} {profiles.length}
            </p>
            <p className="chapter-region">{active.region}</p>
            <h1>
              <small>{t.meet}</small>
              {active.name}
            </h1>
            <p className="chinese-name">{active.chineseName}</p>
            <p>{active.introduction}</p>
            <button className="button button--light" onClick={() => setScreen("profile")}>
              {t.enter}
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {screen === "profile" && (
        <div
          className="profile-screen"
          style={customProperties({ "--profile-accent": active.accent })}
        >
          <header className="profile-heading">
            <button className="text-back" onClick={() => setScreen("chapter")}>
              ← {t.chapter}
            </button>
            <p className="eyebrow">{t.pairedView}</p>
            <h1>
              {active.name}
              <span>{active.chineseName}</span>
            </h1>
          </header>
          <div className="image-pair">
            <figure className="image-placeholder image-placeholder--life">
              <div aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <figcaption>
                <strong>{t.contemporary}</strong>
                <small>{t.contemporaryNote}</small>
              </figcaption>
            </figure>
            <figure className="image-placeholder image-placeholder--detail">
              <div aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <figcaption>
                <strong>{t.cultural}</strong>
                <small>{t.culturalNote}</small>
              </figcaption>
            </figure>
          </div>
          <aside className="memory-card">
            <span className="memory-pin" style={{ background: active.accent }}>
              ●
            </span>
            <div>
              <small>{t.remember}</small>
              <strong>{active.memorableFact}</strong>
            </div>
          </aside>
          <button className="button button--primary button--wide" onClick={advanceProfile}>
            {activeIndex === profiles.length - 1 ? t.test : t.next}
            <span>→</span>
          </button>
        </div>
      )}

      {screen === "challenge" && (
        <div className="challenge-screen">
          <header className="screen-heading">
            <p className="eyebrow">
              {t.memoryMap} · {challengeIndex + 1}/{profiles.length}
            </p>
            <h1>
              {t.question} <em>{challenge.name}</em>?
            </h1>
            <p>{t.choose}</p>
          </header>
          <div className="challenge-layout">
            <div className="mini-island" aria-hidden="true">
              <svg viewBox="0 0 200 360">
                <path d="M132 9c-29 18-43 58-51 96-8 40-36 69-47 108-10 36-7 89 17 129 11 20 32 16 44-4 19-30 24-74 42-111 18-39 32-75 33-113 1-43-7-84-21-102-5-7-11-7-17-3Z" />
              </svg>
              {profiles.map((profile) => (
                <button
                  key={profile.slug}
                  aria-label={profile.mapLabel}
                  className={`quiz-marker quiz-marker--${profile.slug} ${selectedAnswer === profile.slug ? "selected" : ""}`}
                  style={customProperties({ "--marker": profile.accent })}
                  onClick={() => answer(profile.slug)}
                >
                  {profile.slug === "amis" ? "A" : profile.slug === "tao" ? "B" : "C"}
                </button>
              ))}
            </div>
            <div className="answer-list">
              {profiles.map((profile) => (
                <button
                  key={profile.slug}
                  disabled={Boolean(selectedAnswer)}
                  className={
                    selectedAnswer === profile.slug
                      ? profile.slug === challenge.slug
                        ? "correct"
                        : "wrong"
                      : ""
                  }
                  onClick={() => answer(profile.slug)}
                >
                  <span style={{ background: profile.accent }} />
                  <strong>{profile.mapLabel}</strong>
                </button>
              ))}
            </div>
          </div>
          {selectedAnswer && (
            <div
              className={`feedback ${answeredCorrectly ? "feedback--correct" : "feedback--retry"}`}
            >
              <strong>{answeredCorrectly ? t.correct : t.retry}</strong>
              <button onClick={advanceChallenge}>{answeredCorrectly ? t.continue : "↺"}</button>
            </div>
          )}
        </div>
      )}

      {screen === "result" && (
        <div className="result-screen">
          <div className="result-sun" aria-hidden="true">
            <span>
              {score}/{profiles.length}
            </span>
          </div>
          <p className="eyebrow">{t.journeyComplete}</p>
          <h1>{t.resultTitle}</h1>
          <p className="result-body">{t.resultBody}</p>
          <div className="score-card">
            <strong>
              {score}/{profiles.length}
            </strong>
            <span>{t.score}</span>
          </div>
          <section className="context-card">
            <p className="eyebrow">{t.context}</p>
            <h2>{t.contextTitle}</h2>
            <p>{t.contextBody}</p>
            <div className="upcoming">
              <span>＋14</span>
              {t.upcoming}
            </div>
          </section>
          <button className="button button--primary button--wide" onClick={restart}>
            {t.replay}
            <span>↺</span>
          </button>
        </div>
      )}
    </section>
  );
}
