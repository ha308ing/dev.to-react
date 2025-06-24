import type { IArticle } from "@/models/article.model";
import { Link } from "react-router";
import styles from "./article-card.module.css";
import { Text, Title } from "@/components/typography";
import { MINUTES_TO_READ_LABEL, ROUTES } from "@/config";
import { ArticleImage } from "@/components/article-image";

export const ArticleCard: React.FC<{ article: IArticle }> = ({ article }) => {
    const {
        id,
        title,
        user: { name, profile_image },
        tags,
        reading_time_minutes,
    } = article;

    return (
        <section className={styles.articleCard}>
            <ArticleImage article={article} className={styles.articleImage} />

            <div className={styles.articleInfo}>
                <Title
                    level={2}
                    ellipsis={{ rows: 2, tooltip: { title } }}
                    className={styles.title}
                >
                    <Link to={`/${ROUTES.ARTICLE + id}`} state={{ article }}>
                        {title}
                    </Link>
                </Title>

                <img
                    src={profile_image}
                    className={styles.avatarImage}
                    alt={name}
                />

                <Text className={styles.author}>{name}</Text>

                <footer className={styles.footer}>
                    <Text className={styles.tags}>{tags}</Text>

                    <Text className={styles.readingTime}>
                        {`${reading_time_minutes} ${MINUTES_TO_READ_LABEL}`}
                    </Text>
                </footer>
            </div>
        </section>
    );
};
