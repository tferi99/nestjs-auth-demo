import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action';
import { Injectable } from '@nestjs/common';
import { Article } from './article';
import { Author } from './author';

type Subjects = InferSubjects<typeof Article | typeof Author> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForAuthor(author: Author) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
      >(Ability as AbilityClass<AppAbility>);

    if (author.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Article, { authorId: author.id });
    cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
