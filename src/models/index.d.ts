import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPerson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Person, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly number: string;
  readonly birthday?: string | null;
  readonly visit: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPerson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Person, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly number: string;
  readonly birthday?: string | null;
  readonly visit: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Person = LazyLoading extends LazyLoadingDisabled ? EagerPerson : LazyPerson

export declare const Person: (new (init: ModelInit<Person>) => Person) & {
  copyOf(source: Person, mutator: (draft: MutableModel<Person>) => MutableModel<Person> | void): Person;
}