export { ArticleDetailsPageAsync as ArticleDetailsPage } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export type { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
export type { ArticleDetailsPageSchema } from './model/types';
export { addCommentForArticle } from './model/services/addCommentForArticle/addCommentForArticle';
export { articleDetailsCommentsReducer } from './model/slices/ArticleDetailsCommentsSlice/ArticleDetailsCommentsSlice';
export { articleDetailsPageReducer } from './model/slices';
