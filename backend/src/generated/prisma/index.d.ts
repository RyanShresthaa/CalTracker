
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Food
 * 
 */
export type Food = $Result.DefaultSelection<Prisma.$FoodPayload>
/**
 * Model CustomFood
 * 
 */
export type CustomFood = $Result.DefaultSelection<Prisma.$CustomFoodPayload>
/**
 * Model Recipe
 * 
 */
export type Recipe = $Result.DefaultSelection<Prisma.$RecipePayload>
/**
 * Model RecipeIngredient
 * 
 */
export type RecipeIngredient = $Result.DefaultSelection<Prisma.$RecipeIngredientPayload>
/**
 * Model FoodLog
 * 
 */
export type FoodLog = $Result.DefaultSelection<Prisma.$FoodLogPayload>
/**
 * Model WaterLog
 * 
 */
export type WaterLog = $Result.DefaultSelection<Prisma.$WaterLogPayload>
/**
 * Model WeightLog
 * 
 */
export type WeightLog = $Result.DefaultSelection<Prisma.$WeightLogPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.food`: Exposes CRUD operations for the **Food** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Foods
    * const foods = await prisma.food.findMany()
    * ```
    */
  get food(): Prisma.FoodDelegate<ExtArgs>;

  /**
   * `prisma.customFood`: Exposes CRUD operations for the **CustomFood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomFoods
    * const customFoods = await prisma.customFood.findMany()
    * ```
    */
  get customFood(): Prisma.CustomFoodDelegate<ExtArgs>;

  /**
   * `prisma.recipe`: Exposes CRUD operations for the **Recipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipe.findMany()
    * ```
    */
  get recipe(): Prisma.RecipeDelegate<ExtArgs>;

  /**
   * `prisma.recipeIngredient`: Exposes CRUD operations for the **RecipeIngredient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeIngredients
    * const recipeIngredients = await prisma.recipeIngredient.findMany()
    * ```
    */
  get recipeIngredient(): Prisma.RecipeIngredientDelegate<ExtArgs>;

  /**
   * `prisma.foodLog`: Exposes CRUD operations for the **FoodLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoodLogs
    * const foodLogs = await prisma.foodLog.findMany()
    * ```
    */
  get foodLog(): Prisma.FoodLogDelegate<ExtArgs>;

  /**
   * `prisma.waterLog`: Exposes CRUD operations for the **WaterLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WaterLogs
    * const waterLogs = await prisma.waterLog.findMany()
    * ```
    */
  get waterLog(): Prisma.WaterLogDelegate<ExtArgs>;

  /**
   * `prisma.weightLog`: Exposes CRUD operations for the **WeightLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeightLogs
    * const weightLogs = await prisma.weightLog.findMany()
    * ```
    */
  get weightLog(): Prisma.WeightLogDelegate<ExtArgs>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Settings: 'Settings',
    Session: 'Session',
    Food: 'Food',
    CustomFood: 'CustomFood',
    Recipe: 'Recipe',
    RecipeIngredient: 'RecipeIngredient',
    FoodLog: 'FoodLog',
    WaterLog: 'WaterLog',
    WeightLog: 'WeightLog',
    ActivityLog: 'ActivityLog',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "settings" | "session" | "food" | "customFood" | "recipe" | "recipeIngredient" | "foodLog" | "waterLog" | "weightLog" | "activityLog" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Food: {
        payload: Prisma.$FoodPayload<ExtArgs>
        fields: Prisma.FoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          findFirst: {
            args: Prisma.FoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          findMany: {
            args: Prisma.FoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          create: {
            args: Prisma.FoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          createMany: {
            args: Prisma.FoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          delete: {
            args: Prisma.FoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          update: {
            args: Prisma.FoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          deleteMany: {
            args: Prisma.FoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          aggregate: {
            args: Prisma.FoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFood>
          }
          groupBy: {
            args: Prisma.FoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodCountArgs<ExtArgs>
            result: $Utils.Optional<FoodCountAggregateOutputType> | number
          }
        }
      }
      CustomFood: {
        payload: Prisma.$CustomFoodPayload<ExtArgs>
        fields: Prisma.CustomFoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomFoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomFoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>
          }
          findFirst: {
            args: Prisma.CustomFoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomFoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>
          }
          findMany: {
            args: Prisma.CustomFoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>[]
          }
          create: {
            args: Prisma.CustomFoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>
          }
          createMany: {
            args: Prisma.CustomFoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomFoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>[]
          }
          delete: {
            args: Prisma.CustomFoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>
          }
          update: {
            args: Prisma.CustomFoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>
          }
          deleteMany: {
            args: Prisma.CustomFoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomFoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomFoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFoodPayload>
          }
          aggregate: {
            args: Prisma.CustomFoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomFood>
          }
          groupBy: {
            args: Prisma.CustomFoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomFoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomFoodCountArgs<ExtArgs>
            result: $Utils.Optional<CustomFoodCountAggregateOutputType> | number
          }
        }
      }
      Recipe: {
        payload: Prisma.$RecipePayload<ExtArgs>
        fields: Prisma.RecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findFirst: {
            args: Prisma.RecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findMany: {
            args: Prisma.RecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          create: {
            args: Prisma.RecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          createMany: {
            args: Prisma.RecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          delete: {
            args: Prisma.RecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          update: {
            args: Prisma.RecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          deleteMany: {
            args: Prisma.RecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          aggregate: {
            args: Prisma.RecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe>
          }
          groupBy: {
            args: Prisma.RecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCountAggregateOutputType> | number
          }
        }
      }
      RecipeIngredient: {
        payload: Prisma.$RecipeIngredientPayload<ExtArgs>
        fields: Prisma.RecipeIngredientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeIngredientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeIngredientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          findFirst: {
            args: Prisma.RecipeIngredientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeIngredientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          findMany: {
            args: Prisma.RecipeIngredientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>[]
          }
          create: {
            args: Prisma.RecipeIngredientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          createMany: {
            args: Prisma.RecipeIngredientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeIngredientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>[]
          }
          delete: {
            args: Prisma.RecipeIngredientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          update: {
            args: Prisma.RecipeIngredientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          deleteMany: {
            args: Prisma.RecipeIngredientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeIngredientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecipeIngredientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          aggregate: {
            args: Prisma.RecipeIngredientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeIngredient>
          }
          groupBy: {
            args: Prisma.RecipeIngredientGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeIngredientGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeIngredientCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeIngredientCountAggregateOutputType> | number
          }
        }
      }
      FoodLog: {
        payload: Prisma.$FoodLogPayload<ExtArgs>
        fields: Prisma.FoodLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          findFirst: {
            args: Prisma.FoodLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          findMany: {
            args: Prisma.FoodLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>[]
          }
          create: {
            args: Prisma.FoodLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          createMany: {
            args: Prisma.FoodLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>[]
          }
          delete: {
            args: Prisma.FoodLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          update: {
            args: Prisma.FoodLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          deleteMany: {
            args: Prisma.FoodLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FoodLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodLogPayload>
          }
          aggregate: {
            args: Prisma.FoodLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoodLog>
          }
          groupBy: {
            args: Prisma.FoodLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodLogCountArgs<ExtArgs>
            result: $Utils.Optional<FoodLogCountAggregateOutputType> | number
          }
        }
      }
      WaterLog: {
        payload: Prisma.$WaterLogPayload<ExtArgs>
        fields: Prisma.WaterLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WaterLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WaterLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          findFirst: {
            args: Prisma.WaterLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WaterLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          findMany: {
            args: Prisma.WaterLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>[]
          }
          create: {
            args: Prisma.WaterLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          createMany: {
            args: Prisma.WaterLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WaterLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>[]
          }
          delete: {
            args: Prisma.WaterLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          update: {
            args: Prisma.WaterLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          deleteMany: {
            args: Prisma.WaterLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WaterLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WaterLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaterLogPayload>
          }
          aggregate: {
            args: Prisma.WaterLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWaterLog>
          }
          groupBy: {
            args: Prisma.WaterLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WaterLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WaterLogCountArgs<ExtArgs>
            result: $Utils.Optional<WaterLogCountAggregateOutputType> | number
          }
        }
      }
      WeightLog: {
        payload: Prisma.$WeightLogPayload<ExtArgs>
        fields: Prisma.WeightLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeightLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeightLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          findFirst: {
            args: Prisma.WeightLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeightLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          findMany: {
            args: Prisma.WeightLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>[]
          }
          create: {
            args: Prisma.WeightLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          createMany: {
            args: Prisma.WeightLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeightLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>[]
          }
          delete: {
            args: Prisma.WeightLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          update: {
            args: Prisma.WeightLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          deleteMany: {
            args: Prisma.WeightLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeightLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WeightLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeightLogPayload>
          }
          aggregate: {
            args: Prisma.WeightLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeightLog>
          }
          groupBy: {
            args: Prisma.WeightLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeightLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeightLogCountArgs<ExtArgs>
            result: $Utils.Optional<WeightLogCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    foodLogs: number
    waterLogs: number
    weightLogs: number
    activities: number
    customFoods: number
    recipes: number
    notifications: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foodLogs?: boolean | UserCountOutputTypeCountFoodLogsArgs
    waterLogs?: boolean | UserCountOutputTypeCountWaterLogsArgs
    weightLogs?: boolean | UserCountOutputTypeCountWeightLogsArgs
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    customFoods?: boolean | UserCountOutputTypeCountCustomFoodsArgs
    recipes?: boolean | UserCountOutputTypeCountRecipesArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFoodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWaterLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaterLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWeightLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCustomFoodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFoodWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type FoodCountOutputType
   */

  export type FoodCountOutputType = {
    foodLogs: number
    recipeIngredients: number
  }

  export type FoodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foodLogs?: boolean | FoodCountOutputTypeCountFoodLogsArgs
    recipeIngredients?: boolean | FoodCountOutputTypeCountRecipeIngredientsArgs
  }

  // Custom InputTypes
  /**
   * FoodCountOutputType without action
   */
  export type FoodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCountOutputType
     */
    select?: FoodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FoodCountOutputType without action
   */
  export type FoodCountOutputTypeCountFoodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
  }

  /**
   * FoodCountOutputType without action
   */
  export type FoodCountOutputTypeCountRecipeIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeIngredientWhereInput
  }


  /**
   * Count Type CustomFoodCountOutputType
   */

  export type CustomFoodCountOutputType = {
    foodLogs: number
    recipeIngredients: number
  }

  export type CustomFoodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foodLogs?: boolean | CustomFoodCountOutputTypeCountFoodLogsArgs
    recipeIngredients?: boolean | CustomFoodCountOutputTypeCountRecipeIngredientsArgs
  }

  // Custom InputTypes
  /**
   * CustomFoodCountOutputType without action
   */
  export type CustomFoodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFoodCountOutputType
     */
    select?: CustomFoodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomFoodCountOutputType without action
   */
  export type CustomFoodCountOutputTypeCountFoodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
  }

  /**
   * CustomFoodCountOutputType without action
   */
  export type CustomFoodCountOutputTypeCountRecipeIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeIngredientWhereInput
  }


  /**
   * Count Type RecipeCountOutputType
   */

  export type RecipeCountOutputType = {
    ingredients: number
    foodLogs: number
  }

  export type RecipeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingredients?: boolean | RecipeCountOutputTypeCountIngredientsArgs
    foodLogs?: boolean | RecipeCountOutputTypeCountFoodLogsArgs
  }

  // Custom InputTypes
  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCountOutputType
     */
    select?: RecipeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeIngredientWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountFoodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    age: number | null
    height: number | null
    currentWeight: number | null
    goalWeight: number | null
    gymDaysPerWeek: number | null
    dailyWalkKm: number | null
    gymMinutesPerSession: number | null
  }

  export type UserSumAggregateOutputType = {
    age: number | null
    height: number | null
    currentWeight: number | null
    goalWeight: number | null
    gymDaysPerWeek: number | null
    dailyWalkKm: number | null
    gymMinutesPerSession: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    age: number | null
    sex: string | null
    height: number | null
    currentWeight: number | null
    goalWeight: number | null
    activityLevel: string | null
    gymDaysPerWeek: number | null
    dailyWalkKm: number | null
    gymMinutesPerSession: number | null
    goal: string | null
    goalDate: Date | null
    profileCompleted: boolean | null
    isAdmin: boolean | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    age: number | null
    sex: string | null
    height: number | null
    currentWeight: number | null
    goalWeight: number | null
    activityLevel: string | null
    gymDaysPerWeek: number | null
    dailyWalkKm: number | null
    gymMinutesPerSession: number | null
    goal: string | null
    goalDate: Date | null
    profileCompleted: boolean | null
    isAdmin: boolean | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    age: number
    sex: number
    height: number
    currentWeight: number
    goalWeight: number
    activityLevel: number
    gymDaysPerWeek: number
    dailyWalkKm: number
    gymMinutesPerSession: number
    goal: number
    goalDate: number
    profileCompleted: number
    isAdmin: number
    resetToken: number
    resetTokenExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    age?: true
    height?: true
    currentWeight?: true
    goalWeight?: true
    gymDaysPerWeek?: true
    dailyWalkKm?: true
    gymMinutesPerSession?: true
  }

  export type UserSumAggregateInputType = {
    age?: true
    height?: true
    currentWeight?: true
    goalWeight?: true
    gymDaysPerWeek?: true
    dailyWalkKm?: true
    gymMinutesPerSession?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    age?: true
    sex?: true
    height?: true
    currentWeight?: true
    goalWeight?: true
    activityLevel?: true
    gymDaysPerWeek?: true
    dailyWalkKm?: true
    gymMinutesPerSession?: true
    goal?: true
    goalDate?: true
    profileCompleted?: true
    isAdmin?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    age?: true
    sex?: true
    height?: true
    currentWeight?: true
    goalWeight?: true
    activityLevel?: true
    gymDaysPerWeek?: true
    dailyWalkKm?: true
    gymMinutesPerSession?: true
    goal?: true
    goalDate?: true
    profileCompleted?: true
    isAdmin?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    age?: true
    sex?: true
    height?: true
    currentWeight?: true
    goalWeight?: true
    activityLevel?: true
    gymDaysPerWeek?: true
    dailyWalkKm?: true
    gymMinutesPerSession?: true
    goal?: true
    goalDate?: true
    profileCompleted?: true
    isAdmin?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    age: number | null
    sex: string | null
    height: number | null
    currentWeight: number | null
    goalWeight: number | null
    activityLevel: string | null
    gymDaysPerWeek: number | null
    dailyWalkKm: number | null
    gymMinutesPerSession: number | null
    goal: string | null
    goalDate: Date | null
    profileCompleted: boolean
    isAdmin: boolean
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    sex?: boolean
    height?: boolean
    currentWeight?: boolean
    goalWeight?: boolean
    activityLevel?: boolean
    gymDaysPerWeek?: boolean
    dailyWalkKm?: boolean
    gymMinutesPerSession?: boolean
    goal?: boolean
    goalDate?: boolean
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settings?: boolean | User$settingsArgs<ExtArgs>
    foodLogs?: boolean | User$foodLogsArgs<ExtArgs>
    waterLogs?: boolean | User$waterLogsArgs<ExtArgs>
    weightLogs?: boolean | User$weightLogsArgs<ExtArgs>
    activities?: boolean | User$activitiesArgs<ExtArgs>
    customFoods?: boolean | User$customFoodsArgs<ExtArgs>
    recipes?: boolean | User$recipesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    sex?: boolean
    height?: boolean
    currentWeight?: boolean
    goalWeight?: boolean
    activityLevel?: boolean
    gymDaysPerWeek?: boolean
    dailyWalkKm?: boolean
    gymMinutesPerSession?: boolean
    goal?: boolean
    goalDate?: boolean
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    age?: boolean
    sex?: boolean
    height?: boolean
    currentWeight?: boolean
    goalWeight?: boolean
    activityLevel?: boolean
    gymDaysPerWeek?: boolean
    dailyWalkKm?: boolean
    gymMinutesPerSession?: boolean
    goal?: boolean
    goalDate?: boolean
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    settings?: boolean | User$settingsArgs<ExtArgs>
    foodLogs?: boolean | User$foodLogsArgs<ExtArgs>
    waterLogs?: boolean | User$waterLogsArgs<ExtArgs>
    weightLogs?: boolean | User$weightLogsArgs<ExtArgs>
    activities?: boolean | User$activitiesArgs<ExtArgs>
    customFoods?: boolean | User$customFoodsArgs<ExtArgs>
    recipes?: boolean | User$recipesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      settings: Prisma.$SettingsPayload<ExtArgs> | null
      foodLogs: Prisma.$FoodLogPayload<ExtArgs>[]
      waterLogs: Prisma.$WaterLogPayload<ExtArgs>[]
      weightLogs: Prisma.$WeightLogPayload<ExtArgs>[]
      activities: Prisma.$ActivityLogPayload<ExtArgs>[]
      customFoods: Prisma.$CustomFoodPayload<ExtArgs>[]
      recipes: Prisma.$RecipePayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      age: number | null
      sex: string | null
      height: number | null
      currentWeight: number | null
      goalWeight: number | null
      activityLevel: string | null
      gymDaysPerWeek: number | null
      dailyWalkKm: number | null
      gymMinutesPerSession: number | null
      goal: string | null
      goalDate: Date | null
      profileCompleted: boolean
      isAdmin: boolean
      resetToken: string | null
      resetTokenExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    settings<T extends User$settingsArgs<ExtArgs> = {}>(args?: Subset<T, User$settingsArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    foodLogs<T extends User$foodLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$foodLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany"> | Null>
    waterLogs<T extends User$waterLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$waterLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findMany"> | Null>
    weightLogs<T extends User$weightLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$weightLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findMany"> | Null>
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany"> | Null>
    customFoods<T extends User$customFoodsArgs<ExtArgs> = {}>(args?: Subset<T, User$customFoodsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findMany"> | Null>
    recipes<T extends User$recipesArgs<ExtArgs> = {}>(args?: Subset<T, User$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly age: FieldRef<"User", 'Int'>
    readonly sex: FieldRef<"User", 'String'>
    readonly height: FieldRef<"User", 'Float'>
    readonly currentWeight: FieldRef<"User", 'Float'>
    readonly goalWeight: FieldRef<"User", 'Float'>
    readonly activityLevel: FieldRef<"User", 'String'>
    readonly gymDaysPerWeek: FieldRef<"User", 'Int'>
    readonly dailyWalkKm: FieldRef<"User", 'Float'>
    readonly gymMinutesPerSession: FieldRef<"User", 'Int'>
    readonly goal: FieldRef<"User", 'String'>
    readonly goalDate: FieldRef<"User", 'DateTime'>
    readonly profileCompleted: FieldRef<"User", 'Boolean'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.settings
   */
  export type User$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    where?: SettingsWhereInput
  }

  /**
   * User.foodLogs
   */
  export type User$foodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    cursor?: FoodLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * User.waterLogs
   */
  export type User$waterLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    where?: WaterLogWhereInput
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    cursor?: WaterLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * User.weightLogs
   */
  export type User$weightLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    where?: WeightLogWhereInput
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    cursor?: WeightLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User.customFoods
   */
  export type User$customFoodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    where?: CustomFoodWhereInput
    orderBy?: CustomFoodOrderByWithRelationInput | CustomFoodOrderByWithRelationInput[]
    cursor?: CustomFoodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomFoodScalarFieldEnum | CustomFoodScalarFieldEnum[]
  }

  /**
   * User.recipes
   */
  export type User$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    cursor?: RecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsAvgAggregateOutputType = {
    waterGoal: number | null
    calorieGoal: number | null
    proteinGoal: number | null
    carbsGoal: number | null
    fatGoal: number | null
  }

  export type SettingsSumAggregateOutputType = {
    waterGoal: number | null
    calorieGoal: number | null
    proteinGoal: number | null
    carbsGoal: number | null
    fatGoal: number | null
  }

  export type SettingsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    darkMode: boolean | null
    units: string | null
    waterGoal: number | null
    calorieGoal: number | null
    proteinGoal: number | null
    carbsGoal: number | null
    fatGoal: number | null
    notifWater: boolean | null
    notifMeals: boolean | null
    notifWorkout: boolean | null
    notifWeight: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    darkMode: boolean | null
    units: string | null
    waterGoal: number | null
    calorieGoal: number | null
    proteinGoal: number | null
    carbsGoal: number | null
    fatGoal: number | null
    notifWater: boolean | null
    notifMeals: boolean | null
    notifWorkout: boolean | null
    notifWeight: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    userId: number
    darkMode: number
    units: number
    waterGoal: number
    calorieGoal: number
    proteinGoal: number
    carbsGoal: number
    fatGoal: number
    notifWater: number
    notifMeals: number
    notifWorkout: number
    notifWeight: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettingsAvgAggregateInputType = {
    waterGoal?: true
    calorieGoal?: true
    proteinGoal?: true
    carbsGoal?: true
    fatGoal?: true
  }

  export type SettingsSumAggregateInputType = {
    waterGoal?: true
    calorieGoal?: true
    proteinGoal?: true
    carbsGoal?: true
    fatGoal?: true
  }

  export type SettingsMinAggregateInputType = {
    id?: true
    userId?: true
    darkMode?: true
    units?: true
    waterGoal?: true
    calorieGoal?: true
    proteinGoal?: true
    carbsGoal?: true
    fatGoal?: true
    notifWater?: true
    notifMeals?: true
    notifWorkout?: true
    notifWeight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    darkMode?: true
    units?: true
    waterGoal?: true
    calorieGoal?: true
    proteinGoal?: true
    carbsGoal?: true
    fatGoal?: true
    notifWater?: true
    notifMeals?: true
    notifWorkout?: true
    notifWeight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    userId?: true
    darkMode?: true
    units?: true
    waterGoal?: true
    calorieGoal?: true
    proteinGoal?: true
    carbsGoal?: true
    fatGoal?: true
    notifWater?: true
    notifMeals?: true
    notifWorkout?: true
    notifWeight?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _avg?: SettingsAvgAggregateInputType
    _sum?: SettingsSumAggregateInputType
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: string
    userId: string
    darkMode: boolean
    units: string
    waterGoal: number
    calorieGoal: number | null
    proteinGoal: number | null
    carbsGoal: number | null
    fatGoal: number | null
    notifWater: boolean
    notifMeals: boolean
    notifWorkout: boolean
    notifWeight: boolean
    createdAt: Date
    updatedAt: Date
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    units?: boolean
    waterGoal?: boolean
    calorieGoal?: boolean
    proteinGoal?: boolean
    carbsGoal?: boolean
    fatGoal?: boolean
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    units?: boolean
    waterGoal?: boolean
    calorieGoal?: boolean
    proteinGoal?: boolean
    carbsGoal?: boolean
    fatGoal?: boolean
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    units?: boolean
    waterGoal?: boolean
    calorieGoal?: boolean
    proteinGoal?: boolean
    carbsGoal?: boolean
    fatGoal?: boolean
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      darkMode: boolean
      units: string
      waterGoal: number
      calorieGoal: number | null
      proteinGoal: number | null
      carbsGoal: number | null
      fatGoal: number | null
      notifWater: boolean
      notifMeals: boolean
      notifWorkout: boolean
      notifWeight: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingsCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */ 
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'String'>
    readonly userId: FieldRef<"Settings", 'String'>
    readonly darkMode: FieldRef<"Settings", 'Boolean'>
    readonly units: FieldRef<"Settings", 'String'>
    readonly waterGoal: FieldRef<"Settings", 'Float'>
    readonly calorieGoal: FieldRef<"Settings", 'Float'>
    readonly proteinGoal: FieldRef<"Settings", 'Float'>
    readonly carbsGoal: FieldRef<"Settings", 'Float'>
    readonly fatGoal: FieldRef<"Settings", 'Float'>
    readonly notifWater: FieldRef<"Settings", 'Boolean'>
    readonly notifMeals: FieldRef<"Settings", 'Boolean'>
    readonly notifWorkout: FieldRef<"Settings", 'Boolean'>
    readonly notifWeight: FieldRef<"Settings", 'Boolean'>
    readonly createdAt: FieldRef<"Settings", 'DateTime'>
    readonly updatedAt: FieldRef<"Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Settings createManyAndReturn
   */
  export type SettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettingsInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Food
   */

  export type AggregateFood = {
    _count: FoodCountAggregateOutputType | null
    _avg: FoodAvgAggregateOutputType | null
    _sum: FoodSumAggregateOutputType | null
    _min: FoodMinAggregateOutputType | null
    _max: FoodMaxAggregateOutputType | null
  }

  export type FoodAvgAggregateOutputType = {
    servingSize: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
  }

  export type FoodSumAggregateOutputType = {
    servingSize: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
  }

  export type FoodMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    servingSize: number | null
    servingUnit: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    barcode: string | null
    externalSource: string | null
    externalId: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    servingSize: number | null
    servingUnit: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    barcode: string | null
    externalSource: string | null
    externalId: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoodCountAggregateOutputType = {
    id: number
    name: number
    category: number
    servingSize: number
    servingUnit: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    barcode: number
    externalSource: number
    externalId: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FoodAvgAggregateInputType = {
    servingSize?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
  }

  export type FoodSumAggregateInputType = {
    servingSize?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
  }

  export type FoodMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    barcode?: true
    externalSource?: true
    externalId?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoodMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    barcode?: true
    externalSource?: true
    externalId?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoodCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    barcode?: true
    externalSource?: true
    externalId?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Food to aggregate.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Foods
    **/
    _count?: true | FoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodMaxAggregateInputType
  }

  export type GetFoodAggregateType<T extends FoodAggregateArgs> = {
        [P in keyof T & keyof AggregateFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFood[P]>
      : GetScalarType<T[P], AggregateFood[P]>
  }




  export type FoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodWhereInput
    orderBy?: FoodOrderByWithAggregationInput | FoodOrderByWithAggregationInput[]
    by: FoodScalarFieldEnum[] | FoodScalarFieldEnum
    having?: FoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodCountAggregateInputType | true
    _avg?: FoodAvgAggregateInputType
    _sum?: FoodSumAggregateInputType
    _min?: FoodMinAggregateInputType
    _max?: FoodMaxAggregateInputType
  }

  export type FoodGroupByOutputType = {
    id: string
    name: string
    category: string
    servingSize: number
    servingUnit: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    barcode: string | null
    externalSource: string | null
    externalId: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: FoodCountAggregateOutputType | null
    _avg: FoodAvgAggregateOutputType | null
    _sum: FoodSumAggregateOutputType | null
    _min: FoodMinAggregateOutputType | null
    _max: FoodMaxAggregateOutputType | null
  }

  type GetFoodGroupByPayload<T extends FoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodGroupByOutputType[P]>
            : GetScalarType<T[P], FoodGroupByOutputType[P]>
        }
      >
    >


  export type FoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    barcode?: boolean
    externalSource?: boolean
    externalId?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    foodLogs?: boolean | Food$foodLogsArgs<ExtArgs>
    recipeIngredients?: boolean | Food$recipeIngredientsArgs<ExtArgs>
    _count?: boolean | FoodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    barcode?: boolean
    externalSource?: boolean
    externalId?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["food"]>

  export type FoodSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    barcode?: boolean
    externalSource?: boolean
    externalId?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foodLogs?: boolean | Food$foodLogsArgs<ExtArgs>
    recipeIngredients?: boolean | Food$recipeIngredientsArgs<ExtArgs>
    _count?: boolean | FoodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Food"
    objects: {
      foodLogs: Prisma.$FoodLogPayload<ExtArgs>[]
      recipeIngredients: Prisma.$RecipeIngredientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      servingSize: number
      servingUnit: string
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
      sugar: number
      sodium: number
      barcode: string | null
      externalSource: string | null
      externalId: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["food"]>
    composites: {}
  }

  type FoodGetPayload<S extends boolean | null | undefined | FoodDefaultArgs> = $Result.GetResult<Prisma.$FoodPayload, S>

  type FoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FoodFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FoodCountAggregateInputType | true
    }

  export interface FoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Food'], meta: { name: 'Food' } }
    /**
     * Find zero or one Food that matches the filter.
     * @param {FoodFindUniqueArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodFindUniqueArgs>(args: SelectSubset<T, FoodFindUniqueArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Food that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FoodFindUniqueOrThrowArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Food that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindFirstArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodFindFirstArgs>(args?: SelectSubset<T, FoodFindFirstArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Food that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindFirstOrThrowArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Foods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Foods
     * const foods = await prisma.food.findMany()
     * 
     * // Get first 10 Foods
     * const foods = await prisma.food.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodWithIdOnly = await prisma.food.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodFindManyArgs>(args?: SelectSubset<T, FoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Food.
     * @param {FoodCreateArgs} args - Arguments to create a Food.
     * @example
     * // Create one Food
     * const Food = await prisma.food.create({
     *   data: {
     *     // ... data to create a Food
     *   }
     * })
     * 
     */
    create<T extends FoodCreateArgs>(args: SelectSubset<T, FoodCreateArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Foods.
     * @param {FoodCreateManyArgs} args - Arguments to create many Foods.
     * @example
     * // Create many Foods
     * const food = await prisma.food.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodCreateManyArgs>(args?: SelectSubset<T, FoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Foods and returns the data saved in the database.
     * @param {FoodCreateManyAndReturnArgs} args - Arguments to create many Foods.
     * @example
     * // Create many Foods
     * const food = await prisma.food.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Foods and only return the `id`
     * const foodWithIdOnly = await prisma.food.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Food.
     * @param {FoodDeleteArgs} args - Arguments to delete one Food.
     * @example
     * // Delete one Food
     * const Food = await prisma.food.delete({
     *   where: {
     *     // ... filter to delete one Food
     *   }
     * })
     * 
     */
    delete<T extends FoodDeleteArgs>(args: SelectSubset<T, FoodDeleteArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Food.
     * @param {FoodUpdateArgs} args - Arguments to update one Food.
     * @example
     * // Update one Food
     * const food = await prisma.food.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodUpdateArgs>(args: SelectSubset<T, FoodUpdateArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Foods.
     * @param {FoodDeleteManyArgs} args - Arguments to filter Foods to delete.
     * @example
     * // Delete a few Foods
     * const { count } = await prisma.food.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodDeleteManyArgs>(args?: SelectSubset<T, FoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Foods
     * const food = await prisma.food.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodUpdateManyArgs>(args: SelectSubset<T, FoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Food.
     * @param {FoodUpsertArgs} args - Arguments to update or create a Food.
     * @example
     * // Update or create a Food
     * const food = await prisma.food.upsert({
     *   create: {
     *     // ... data to create a Food
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Food we want to update
     *   }
     * })
     */
    upsert<T extends FoodUpsertArgs>(args: SelectSubset<T, FoodUpsertArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Foods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCountArgs} args - Arguments to filter Foods to count.
     * @example
     * // Count the number of Foods
     * const count = await prisma.food.count({
     *   where: {
     *     // ... the filter for the Foods we want to count
     *   }
     * })
    **/
    count<T extends FoodCountArgs>(
      args?: Subset<T, FoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Food.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodAggregateArgs>(args: Subset<T, FoodAggregateArgs>): Prisma.PrismaPromise<GetFoodAggregateType<T>>

    /**
     * Group by Food.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodGroupByArgs['orderBy'] }
        : { orderBy?: FoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Food model
   */
  readonly fields: FoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Food.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    foodLogs<T extends Food$foodLogsArgs<ExtArgs> = {}>(args?: Subset<T, Food$foodLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany"> | Null>
    recipeIngredients<T extends Food$recipeIngredientsArgs<ExtArgs> = {}>(args?: Subset<T, Food$recipeIngredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Food model
   */ 
  interface FoodFieldRefs {
    readonly id: FieldRef<"Food", 'String'>
    readonly name: FieldRef<"Food", 'String'>
    readonly category: FieldRef<"Food", 'String'>
    readonly servingSize: FieldRef<"Food", 'Float'>
    readonly servingUnit: FieldRef<"Food", 'String'>
    readonly calories: FieldRef<"Food", 'Float'>
    readonly protein: FieldRef<"Food", 'Float'>
    readonly carbs: FieldRef<"Food", 'Float'>
    readonly fat: FieldRef<"Food", 'Float'>
    readonly fiber: FieldRef<"Food", 'Float'>
    readonly sugar: FieldRef<"Food", 'Float'>
    readonly sodium: FieldRef<"Food", 'Float'>
    readonly barcode: FieldRef<"Food", 'String'>
    readonly externalSource: FieldRef<"Food", 'String'>
    readonly externalId: FieldRef<"Food", 'String'>
    readonly isVerified: FieldRef<"Food", 'Boolean'>
    readonly createdAt: FieldRef<"Food", 'DateTime'>
    readonly updatedAt: FieldRef<"Food", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Food findUnique
   */
  export type FoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food findUniqueOrThrow
   */
  export type FoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food findFirst
   */
  export type FoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foods.
     */
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food findFirstOrThrow
   */
  export type FoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foods.
     */
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food findMany
   */
  export type FoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Foods to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food create
   */
  export type FoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The data needed to create a Food.
     */
    data: XOR<FoodCreateInput, FoodUncheckedCreateInput>
  }

  /**
   * Food createMany
   */
  export type FoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Foods.
     */
    data: FoodCreateManyInput | FoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Food createManyAndReturn
   */
  export type FoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Foods.
     */
    data: FoodCreateManyInput | FoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Food update
   */
  export type FoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The data needed to update a Food.
     */
    data: XOR<FoodUpdateInput, FoodUncheckedUpdateInput>
    /**
     * Choose, which Food to update.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food updateMany
   */
  export type FoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Foods.
     */
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyInput>
    /**
     * Filter which Foods to update
     */
    where?: FoodWhereInput
  }

  /**
   * Food upsert
   */
  export type FoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The filter to search for the Food to update in case it exists.
     */
    where: FoodWhereUniqueInput
    /**
     * In case the Food found by the `where` argument doesn't exist, create a new Food with this data.
     */
    create: XOR<FoodCreateInput, FoodUncheckedCreateInput>
    /**
     * In case the Food was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodUpdateInput, FoodUncheckedUpdateInput>
  }

  /**
   * Food delete
   */
  export type FoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter which Food to delete.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food deleteMany
   */
  export type FoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foods to delete
     */
    where?: FoodWhereInput
  }

  /**
   * Food.foodLogs
   */
  export type Food$foodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    cursor?: FoodLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * Food.recipeIngredients
   */
  export type Food$recipeIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    where?: RecipeIngredientWhereInput
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    cursor?: RecipeIngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * Food without action
   */
  export type FoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
  }


  /**
   * Model CustomFood
   */

  export type AggregateCustomFood = {
    _count: CustomFoodCountAggregateOutputType | null
    _avg: CustomFoodAvgAggregateOutputType | null
    _sum: CustomFoodSumAggregateOutputType | null
    _min: CustomFoodMinAggregateOutputType | null
    _max: CustomFoodMaxAggregateOutputType | null
  }

  export type CustomFoodAvgAggregateOutputType = {
    servingSize: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
  }

  export type CustomFoodSumAggregateOutputType = {
    servingSize: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
  }

  export type CustomFoodMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    category: string | null
    servingSize: number | null
    servingUnit: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFoodMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    category: string | null
    servingSize: number | null
    servingUnit: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFoodCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    category: number
    servingSize: number
    servingUnit: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomFoodAvgAggregateInputType = {
    servingSize?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
  }

  export type CustomFoodSumAggregateInputType = {
    servingSize?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
  }

  export type CustomFoodMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    category?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFoodMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    category?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFoodCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    category?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomFoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFood to aggregate.
     */
    where?: CustomFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFoods to fetch.
     */
    orderBy?: CustomFoodOrderByWithRelationInput | CustomFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomFoods
    **/
    _count?: true | CustomFoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomFoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomFoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomFoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomFoodMaxAggregateInputType
  }

  export type GetCustomFoodAggregateType<T extends CustomFoodAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomFood[P]>
      : GetScalarType<T[P], AggregateCustomFood[P]>
  }




  export type CustomFoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFoodWhereInput
    orderBy?: CustomFoodOrderByWithAggregationInput | CustomFoodOrderByWithAggregationInput[]
    by: CustomFoodScalarFieldEnum[] | CustomFoodScalarFieldEnum
    having?: CustomFoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomFoodCountAggregateInputType | true
    _avg?: CustomFoodAvgAggregateInputType
    _sum?: CustomFoodSumAggregateInputType
    _min?: CustomFoodMinAggregateInputType
    _max?: CustomFoodMaxAggregateInputType
  }

  export type CustomFoodGroupByOutputType = {
    id: string
    userId: string
    name: string
    category: string
    servingSize: number
    servingUnit: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    createdAt: Date
    updatedAt: Date
    _count: CustomFoodCountAggregateOutputType | null
    _avg: CustomFoodAvgAggregateOutputType | null
    _sum: CustomFoodSumAggregateOutputType | null
    _min: CustomFoodMinAggregateOutputType | null
    _max: CustomFoodMaxAggregateOutputType | null
  }

  type GetCustomFoodGroupByPayload<T extends CustomFoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomFoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomFoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomFoodGroupByOutputType[P]>
            : GetScalarType<T[P], CustomFoodGroupByOutputType[P]>
        }
      >
    >


  export type CustomFoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    foodLogs?: boolean | CustomFood$foodLogsArgs<ExtArgs>
    recipeIngredients?: boolean | CustomFood$recipeIngredientsArgs<ExtArgs>
    _count?: boolean | CustomFoodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customFood"]>

  export type CustomFoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customFood"]>

  export type CustomFoodSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomFoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    foodLogs?: boolean | CustomFood$foodLogsArgs<ExtArgs>
    recipeIngredients?: boolean | CustomFood$recipeIngredientsArgs<ExtArgs>
    _count?: boolean | CustomFoodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomFoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CustomFoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomFood"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      foodLogs: Prisma.$FoodLogPayload<ExtArgs>[]
      recipeIngredients: Prisma.$RecipeIngredientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      category: string
      servingSize: number
      servingUnit: string
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
      sugar: number
      sodium: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customFood"]>
    composites: {}
  }

  type CustomFoodGetPayload<S extends boolean | null | undefined | CustomFoodDefaultArgs> = $Result.GetResult<Prisma.$CustomFoodPayload, S>

  type CustomFoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomFoodFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomFoodCountAggregateInputType | true
    }

  export interface CustomFoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomFood'], meta: { name: 'CustomFood' } }
    /**
     * Find zero or one CustomFood that matches the filter.
     * @param {CustomFoodFindUniqueArgs} args - Arguments to find a CustomFood
     * @example
     * // Get one CustomFood
     * const customFood = await prisma.customFood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomFoodFindUniqueArgs>(args: SelectSubset<T, CustomFoodFindUniqueArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomFood that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomFoodFindUniqueOrThrowArgs} args - Arguments to find a CustomFood
     * @example
     * // Get one CustomFood
     * const customFood = await prisma.customFood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomFoodFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomFoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomFood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodFindFirstArgs} args - Arguments to find a CustomFood
     * @example
     * // Get one CustomFood
     * const customFood = await prisma.customFood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomFoodFindFirstArgs>(args?: SelectSubset<T, CustomFoodFindFirstArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomFood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodFindFirstOrThrowArgs} args - Arguments to find a CustomFood
     * @example
     * // Get one CustomFood
     * const customFood = await prisma.customFood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomFoodFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomFoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomFoods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomFoods
     * const customFoods = await prisma.customFood.findMany()
     * 
     * // Get first 10 CustomFoods
     * const customFoods = await prisma.customFood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customFoodWithIdOnly = await prisma.customFood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomFoodFindManyArgs>(args?: SelectSubset<T, CustomFoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomFood.
     * @param {CustomFoodCreateArgs} args - Arguments to create a CustomFood.
     * @example
     * // Create one CustomFood
     * const CustomFood = await prisma.customFood.create({
     *   data: {
     *     // ... data to create a CustomFood
     *   }
     * })
     * 
     */
    create<T extends CustomFoodCreateArgs>(args: SelectSubset<T, CustomFoodCreateArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomFoods.
     * @param {CustomFoodCreateManyArgs} args - Arguments to create many CustomFoods.
     * @example
     * // Create many CustomFoods
     * const customFood = await prisma.customFood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomFoodCreateManyArgs>(args?: SelectSubset<T, CustomFoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomFoods and returns the data saved in the database.
     * @param {CustomFoodCreateManyAndReturnArgs} args - Arguments to create many CustomFoods.
     * @example
     * // Create many CustomFoods
     * const customFood = await prisma.customFood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomFoods and only return the `id`
     * const customFoodWithIdOnly = await prisma.customFood.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomFoodCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomFoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustomFood.
     * @param {CustomFoodDeleteArgs} args - Arguments to delete one CustomFood.
     * @example
     * // Delete one CustomFood
     * const CustomFood = await prisma.customFood.delete({
     *   where: {
     *     // ... filter to delete one CustomFood
     *   }
     * })
     * 
     */
    delete<T extends CustomFoodDeleteArgs>(args: SelectSubset<T, CustomFoodDeleteArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomFood.
     * @param {CustomFoodUpdateArgs} args - Arguments to update one CustomFood.
     * @example
     * // Update one CustomFood
     * const customFood = await prisma.customFood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomFoodUpdateArgs>(args: SelectSubset<T, CustomFoodUpdateArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomFoods.
     * @param {CustomFoodDeleteManyArgs} args - Arguments to filter CustomFoods to delete.
     * @example
     * // Delete a few CustomFoods
     * const { count } = await prisma.customFood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomFoodDeleteManyArgs>(args?: SelectSubset<T, CustomFoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomFoods
     * const customFood = await prisma.customFood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomFoodUpdateManyArgs>(args: SelectSubset<T, CustomFoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomFood.
     * @param {CustomFoodUpsertArgs} args - Arguments to update or create a CustomFood.
     * @example
     * // Update or create a CustomFood
     * const customFood = await prisma.customFood.upsert({
     *   create: {
     *     // ... data to create a CustomFood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomFood we want to update
     *   }
     * })
     */
    upsert<T extends CustomFoodUpsertArgs>(args: SelectSubset<T, CustomFoodUpsertArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodCountArgs} args - Arguments to filter CustomFoods to count.
     * @example
     * // Count the number of CustomFoods
     * const count = await prisma.customFood.count({
     *   where: {
     *     // ... the filter for the CustomFoods we want to count
     *   }
     * })
    **/
    count<T extends CustomFoodCountArgs>(
      args?: Subset<T, CustomFoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomFoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomFoodAggregateArgs>(args: Subset<T, CustomFoodAggregateArgs>): Prisma.PrismaPromise<GetCustomFoodAggregateType<T>>

    /**
     * Group by CustomFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomFoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomFoodGroupByArgs['orderBy'] }
        : { orderBy?: CustomFoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomFoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomFood model
   */
  readonly fields: CustomFoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomFood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomFoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    foodLogs<T extends CustomFood$foodLogsArgs<ExtArgs> = {}>(args?: Subset<T, CustomFood$foodLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany"> | Null>
    recipeIngredients<T extends CustomFood$recipeIngredientsArgs<ExtArgs> = {}>(args?: Subset<T, CustomFood$recipeIngredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomFood model
   */ 
  interface CustomFoodFieldRefs {
    readonly id: FieldRef<"CustomFood", 'String'>
    readonly userId: FieldRef<"CustomFood", 'String'>
    readonly name: FieldRef<"CustomFood", 'String'>
    readonly category: FieldRef<"CustomFood", 'String'>
    readonly servingSize: FieldRef<"CustomFood", 'Float'>
    readonly servingUnit: FieldRef<"CustomFood", 'String'>
    readonly calories: FieldRef<"CustomFood", 'Float'>
    readonly protein: FieldRef<"CustomFood", 'Float'>
    readonly carbs: FieldRef<"CustomFood", 'Float'>
    readonly fat: FieldRef<"CustomFood", 'Float'>
    readonly fiber: FieldRef<"CustomFood", 'Float'>
    readonly sugar: FieldRef<"CustomFood", 'Float'>
    readonly sodium: FieldRef<"CustomFood", 'Float'>
    readonly createdAt: FieldRef<"CustomFood", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomFood", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomFood findUnique
   */
  export type CustomFoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * Filter, which CustomFood to fetch.
     */
    where: CustomFoodWhereUniqueInput
  }

  /**
   * CustomFood findUniqueOrThrow
   */
  export type CustomFoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * Filter, which CustomFood to fetch.
     */
    where: CustomFoodWhereUniqueInput
  }

  /**
   * CustomFood findFirst
   */
  export type CustomFoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * Filter, which CustomFood to fetch.
     */
    where?: CustomFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFoods to fetch.
     */
    orderBy?: CustomFoodOrderByWithRelationInput | CustomFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFoods.
     */
    cursor?: CustomFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFoods.
     */
    distinct?: CustomFoodScalarFieldEnum | CustomFoodScalarFieldEnum[]
  }

  /**
   * CustomFood findFirstOrThrow
   */
  export type CustomFoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * Filter, which CustomFood to fetch.
     */
    where?: CustomFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFoods to fetch.
     */
    orderBy?: CustomFoodOrderByWithRelationInput | CustomFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFoods.
     */
    cursor?: CustomFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFoods.
     */
    distinct?: CustomFoodScalarFieldEnum | CustomFoodScalarFieldEnum[]
  }

  /**
   * CustomFood findMany
   */
  export type CustomFoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * Filter, which CustomFoods to fetch.
     */
    where?: CustomFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFoods to fetch.
     */
    orderBy?: CustomFoodOrderByWithRelationInput | CustomFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomFoods.
     */
    cursor?: CustomFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFoods.
     */
    skip?: number
    distinct?: CustomFoodScalarFieldEnum | CustomFoodScalarFieldEnum[]
  }

  /**
   * CustomFood create
   */
  export type CustomFoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomFood.
     */
    data: XOR<CustomFoodCreateInput, CustomFoodUncheckedCreateInput>
  }

  /**
   * CustomFood createMany
   */
  export type CustomFoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomFoods.
     */
    data: CustomFoodCreateManyInput | CustomFoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomFood createManyAndReturn
   */
  export type CustomFoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustomFoods.
     */
    data: CustomFoodCreateManyInput | CustomFoodCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomFood update
   */
  export type CustomFoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomFood.
     */
    data: XOR<CustomFoodUpdateInput, CustomFoodUncheckedUpdateInput>
    /**
     * Choose, which CustomFood to update.
     */
    where: CustomFoodWhereUniqueInput
  }

  /**
   * CustomFood updateMany
   */
  export type CustomFoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomFoods.
     */
    data: XOR<CustomFoodUpdateManyMutationInput, CustomFoodUncheckedUpdateManyInput>
    /**
     * Filter which CustomFoods to update
     */
    where?: CustomFoodWhereInput
  }

  /**
   * CustomFood upsert
   */
  export type CustomFoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomFood to update in case it exists.
     */
    where: CustomFoodWhereUniqueInput
    /**
     * In case the CustomFood found by the `where` argument doesn't exist, create a new CustomFood with this data.
     */
    create: XOR<CustomFoodCreateInput, CustomFoodUncheckedCreateInput>
    /**
     * In case the CustomFood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomFoodUpdateInput, CustomFoodUncheckedUpdateInput>
  }

  /**
   * CustomFood delete
   */
  export type CustomFoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    /**
     * Filter which CustomFood to delete.
     */
    where: CustomFoodWhereUniqueInput
  }

  /**
   * CustomFood deleteMany
   */
  export type CustomFoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFoods to delete
     */
    where?: CustomFoodWhereInput
  }

  /**
   * CustomFood.foodLogs
   */
  export type CustomFood$foodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    cursor?: FoodLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * CustomFood.recipeIngredients
   */
  export type CustomFood$recipeIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    where?: RecipeIngredientWhereInput
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    cursor?: RecipeIngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * CustomFood without action
   */
  export type CustomFoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
  }


  /**
   * Model Recipe
   */

  export type AggregateRecipe = {
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  export type RecipeAvgAggregateOutputType = {
    servings: number | null
    servingSize: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    totalWeight: number | null
  }

  export type RecipeSumAggregateOutputType = {
    servings: number | null
    servingSize: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    totalWeight: number | null
  }

  export type RecipeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    servings: number | null
    servingSize: number | null
    servingUnit: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    totalWeight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    servings: number | null
    servingSize: number | null
    servingUnit: string | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sugar: number | null
    sodium: number | null
    totalWeight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    servings: number
    servingSize: number
    servingUnit: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    totalWeight: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecipeAvgAggregateInputType = {
    servings?: true
    servingSize?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    totalWeight?: true
  }

  export type RecipeSumAggregateInputType = {
    servings?: true
    servingSize?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    totalWeight?: true
  }

  export type RecipeMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    servings?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    totalWeight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    servings?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    totalWeight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    servings?: true
    servingSize?: true
    servingUnit?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sugar?: true
    sodium?: true
    totalWeight?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe to aggregate.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeMaxAggregateInputType
  }

  export type GetRecipeAggregateType<T extends RecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe[P]>
      : GetScalarType<T[P], AggregateRecipe[P]>
  }




  export type RecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithAggregationInput | RecipeOrderByWithAggregationInput[]
    by: RecipeScalarFieldEnum[] | RecipeScalarFieldEnum
    having?: RecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCountAggregateInputType | true
    _avg?: RecipeAvgAggregateInputType
    _sum?: RecipeSumAggregateInputType
    _min?: RecipeMinAggregateInputType
    _max?: RecipeMaxAggregateInputType
  }

  export type RecipeGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    servings: number
    servingSize: number
    servingUnit: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    totalWeight: number
    createdAt: Date
    updatedAt: Date
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  type GetRecipeGroupByPayload<T extends RecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeGroupByOutputType[P]>
        }
      >
    >


  export type RecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    servings?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    totalWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    ingredients?: boolean | Recipe$ingredientsArgs<ExtArgs>
    foodLogs?: boolean | Recipe$foodLogsArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    servings?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    totalWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    servings?: boolean
    servingSize?: boolean
    servingUnit?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sugar?: boolean
    sodium?: boolean
    totalWeight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    ingredients?: boolean | Recipe$ingredientsArgs<ExtArgs>
    foodLogs?: boolean | Recipe$foodLogsArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recipe"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      ingredients: Prisma.$RecipeIngredientPayload<ExtArgs>[]
      foodLogs: Prisma.$FoodLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      servings: number
      servingSize: number
      servingUnit: string
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
      sugar: number
      sodium: number
      totalWeight: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recipe"]>
    composites: {}
  }

  type RecipeGetPayload<S extends boolean | null | undefined | RecipeDefaultArgs> = $Result.GetResult<Prisma.$RecipePayload, S>

  type RecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecipeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecipeCountAggregateInputType | true
    }

  export interface RecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe'], meta: { name: 'Recipe' } }
    /**
     * Find zero or one Recipe that matches the filter.
     * @param {RecipeFindUniqueArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFindUniqueArgs>(args: SelectSubset<T, RecipeFindUniqueArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Recipe that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecipeFindUniqueOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Recipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFindFirstArgs>(args?: SelectSubset<T, RecipeFindFirstArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Recipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipe.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeWithIdOnly = await prisma.recipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFindManyArgs>(args?: SelectSubset<T, RecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Recipe.
     * @param {RecipeCreateArgs} args - Arguments to create a Recipe.
     * @example
     * // Create one Recipe
     * const Recipe = await prisma.recipe.create({
     *   data: {
     *     // ... data to create a Recipe
     *   }
     * })
     * 
     */
    create<T extends RecipeCreateArgs>(args: SelectSubset<T, RecipeCreateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Recipes.
     * @param {RecipeCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCreateManyArgs>(args?: SelectSubset<T, RecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {RecipeCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Recipe.
     * @param {RecipeDeleteArgs} args - Arguments to delete one Recipe.
     * @example
     * // Delete one Recipe
     * const Recipe = await prisma.recipe.delete({
     *   where: {
     *     // ... filter to delete one Recipe
     *   }
     * })
     * 
     */
    delete<T extends RecipeDeleteArgs>(args: SelectSubset<T, RecipeDeleteArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Recipe.
     * @param {RecipeUpdateArgs} args - Arguments to update one Recipe.
     * @example
     * // Update one Recipe
     * const recipe = await prisma.recipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeUpdateArgs>(args: SelectSubset<T, RecipeUpdateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Recipes.
     * @param {RecipeDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeDeleteManyArgs>(args?: SelectSubset<T, RecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeUpdateManyArgs>(args: SelectSubset<T, RecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recipe.
     * @param {RecipeUpsertArgs} args - Arguments to update or create a Recipe.
     * @example
     * // Update or create a Recipe
     * const recipe = await prisma.recipe.upsert({
     *   create: {
     *     // ... data to create a Recipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe we want to update
     *   }
     * })
     */
    upsert<T extends RecipeUpsertArgs>(args: SelectSubset<T, RecipeUpsertArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipe.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipeCountArgs>(
      args?: Subset<T, RecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeAggregateArgs>(args: Subset<T, RecipeAggregateArgs>): Prisma.PrismaPromise<GetRecipeAggregateType<T>>

    /**
     * Group by Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeGroupByArgs['orderBy'] }
        : { orderBy?: RecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe model
   */
  readonly fields: RecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    ingredients<T extends Recipe$ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findMany"> | Null>
    foodLogs<T extends Recipe$foodLogsArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$foodLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recipe model
   */ 
  interface RecipeFieldRefs {
    readonly id: FieldRef<"Recipe", 'String'>
    readonly userId: FieldRef<"Recipe", 'String'>
    readonly name: FieldRef<"Recipe", 'String'>
    readonly description: FieldRef<"Recipe", 'String'>
    readonly servings: FieldRef<"Recipe", 'Float'>
    readonly servingSize: FieldRef<"Recipe", 'Float'>
    readonly servingUnit: FieldRef<"Recipe", 'String'>
    readonly calories: FieldRef<"Recipe", 'Float'>
    readonly protein: FieldRef<"Recipe", 'Float'>
    readonly carbs: FieldRef<"Recipe", 'Float'>
    readonly fat: FieldRef<"Recipe", 'Float'>
    readonly fiber: FieldRef<"Recipe", 'Float'>
    readonly sugar: FieldRef<"Recipe", 'Float'>
    readonly sodium: FieldRef<"Recipe", 'Float'>
    readonly totalWeight: FieldRef<"Recipe", 'Float'>
    readonly createdAt: FieldRef<"Recipe", 'DateTime'>
    readonly updatedAt: FieldRef<"Recipe", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recipe findUnique
   */
  export type RecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findUniqueOrThrow
   */
  export type RecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findFirst
   */
  export type RecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findFirstOrThrow
   */
  export type RecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findMany
   */
  export type RecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe create
   */
  export type RecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipe.
     */
    data: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
  }

  /**
   * Recipe createMany
   */
  export type RecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe createManyAndReturn
   */
  export type RecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe update
   */
  export type RecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipe.
     */
    data: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
    /**
     * Choose, which Recipe to update.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe updateMany
   */
  export type RecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
  }

  /**
   * Recipe upsert
   */
  export type RecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipe to update in case it exists.
     */
    where: RecipeWhereUniqueInput
    /**
     * In case the Recipe found by the `where` argument doesn't exist, create a new Recipe with this data.
     */
    create: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
    /**
     * In case the Recipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
  }

  /**
   * Recipe delete
   */
  export type RecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter which Recipe to delete.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe deleteMany
   */
  export type RecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipeWhereInput
  }

  /**
   * Recipe.ingredients
   */
  export type Recipe$ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    where?: RecipeIngredientWhereInput
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    cursor?: RecipeIngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * Recipe.foodLogs
   */
  export type Recipe$foodLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    cursor?: FoodLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * Recipe without action
   */
  export type RecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
  }


  /**
   * Model RecipeIngredient
   */

  export type AggregateRecipeIngredient = {
    _count: RecipeIngredientCountAggregateOutputType | null
    _avg: RecipeIngredientAvgAggregateOutputType | null
    _sum: RecipeIngredientSumAggregateOutputType | null
    _min: RecipeIngredientMinAggregateOutputType | null
    _max: RecipeIngredientMaxAggregateOutputType | null
  }

  export type RecipeIngredientAvgAggregateOutputType = {
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sortOrder: number | null
  }

  export type RecipeIngredientSumAggregateOutputType = {
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sortOrder: number | null
  }

  export type RecipeIngredientMinAggregateOutputType = {
    id: string | null
    recipeId: string | null
    name: string | null
    foodId: string | null
    customFoodId: string | null
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sortOrder: number | null
  }

  export type RecipeIngredientMaxAggregateOutputType = {
    id: string | null
    recipeId: string | null
    name: string | null
    foodId: string | null
    customFoodId: string | null
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    sortOrder: number | null
  }

  export type RecipeIngredientCountAggregateOutputType = {
    id: number
    recipeId: number
    name: number
    foodId: number
    customFoodId: number
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sortOrder: number
    _all: number
  }


  export type RecipeIngredientAvgAggregateInputType = {
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sortOrder?: true
  }

  export type RecipeIngredientSumAggregateInputType = {
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sortOrder?: true
  }

  export type RecipeIngredientMinAggregateInputType = {
    id?: true
    recipeId?: true
    name?: true
    foodId?: true
    customFoodId?: true
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sortOrder?: true
  }

  export type RecipeIngredientMaxAggregateInputType = {
    id?: true
    recipeId?: true
    name?: true
    foodId?: true
    customFoodId?: true
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sortOrder?: true
  }

  export type RecipeIngredientCountAggregateInputType = {
    id?: true
    recipeId?: true
    name?: true
    foodId?: true
    customFoodId?: true
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    sortOrder?: true
    _all?: true
  }

  export type RecipeIngredientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeIngredient to aggregate.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeIngredients
    **/
    _count?: true | RecipeIngredientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeIngredientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeIngredientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeIngredientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeIngredientMaxAggregateInputType
  }

  export type GetRecipeIngredientAggregateType<T extends RecipeIngredientAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeIngredient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeIngredient[P]>
      : GetScalarType<T[P], AggregateRecipeIngredient[P]>
  }




  export type RecipeIngredientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeIngredientWhereInput
    orderBy?: RecipeIngredientOrderByWithAggregationInput | RecipeIngredientOrderByWithAggregationInput[]
    by: RecipeIngredientScalarFieldEnum[] | RecipeIngredientScalarFieldEnum
    having?: RecipeIngredientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeIngredientCountAggregateInputType | true
    _avg?: RecipeIngredientAvgAggregateInputType
    _sum?: RecipeIngredientSumAggregateInputType
    _min?: RecipeIngredientMinAggregateInputType
    _max?: RecipeIngredientMaxAggregateInputType
  }

  export type RecipeIngredientGroupByOutputType = {
    id: string
    recipeId: string
    name: string
    foodId: string | null
    customFoodId: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sortOrder: number
    _count: RecipeIngredientCountAggregateOutputType | null
    _avg: RecipeIngredientAvgAggregateOutputType | null
    _sum: RecipeIngredientSumAggregateOutputType | null
    _min: RecipeIngredientMinAggregateOutputType | null
    _max: RecipeIngredientMaxAggregateOutputType | null
  }

  type GetRecipeIngredientGroupByPayload<T extends RecipeIngredientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeIngredientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeIngredientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeIngredientGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeIngredientGroupByOutputType[P]>
        }
      >
    >


  export type RecipeIngredientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recipeId?: boolean
    name?: boolean
    foodId?: boolean
    customFoodId?: boolean
    amount?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sortOrder?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
    food?: boolean | RecipeIngredient$foodArgs<ExtArgs>
    customFood?: boolean | RecipeIngredient$customFoodArgs<ExtArgs>
  }, ExtArgs["result"]["recipeIngredient"]>

  export type RecipeIngredientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recipeId?: boolean
    name?: boolean
    foodId?: boolean
    customFoodId?: boolean
    amount?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sortOrder?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
    food?: boolean | RecipeIngredient$foodArgs<ExtArgs>
    customFood?: boolean | RecipeIngredient$customFoodArgs<ExtArgs>
  }, ExtArgs["result"]["recipeIngredient"]>

  export type RecipeIngredientSelectScalar = {
    id?: boolean
    recipeId?: boolean
    name?: boolean
    foodId?: boolean
    customFoodId?: boolean
    amount?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    sortOrder?: boolean
  }

  export type RecipeIngredientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
    food?: boolean | RecipeIngredient$foodArgs<ExtArgs>
    customFood?: boolean | RecipeIngredient$customFoodArgs<ExtArgs>
  }
  export type RecipeIngredientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
    food?: boolean | RecipeIngredient$foodArgs<ExtArgs>
    customFood?: boolean | RecipeIngredient$customFoodArgs<ExtArgs>
  }

  export type $RecipeIngredientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeIngredient"
    objects: {
      recipe: Prisma.$RecipePayload<ExtArgs>
      food: Prisma.$FoodPayload<ExtArgs> | null
      customFood: Prisma.$CustomFoodPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      recipeId: string
      name: string
      foodId: string | null
      customFoodId: string | null
      amount: number
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
      sortOrder: number
    }, ExtArgs["result"]["recipeIngredient"]>
    composites: {}
  }

  type RecipeIngredientGetPayload<S extends boolean | null | undefined | RecipeIngredientDefaultArgs> = $Result.GetResult<Prisma.$RecipeIngredientPayload, S>

  type RecipeIngredientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecipeIngredientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecipeIngredientCountAggregateInputType | true
    }

  export interface RecipeIngredientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeIngredient'], meta: { name: 'RecipeIngredient' } }
    /**
     * Find zero or one RecipeIngredient that matches the filter.
     * @param {RecipeIngredientFindUniqueArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeIngredientFindUniqueArgs>(args: SelectSubset<T, RecipeIngredientFindUniqueArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RecipeIngredient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecipeIngredientFindUniqueOrThrowArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeIngredientFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeIngredientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RecipeIngredient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientFindFirstArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeIngredientFindFirstArgs>(args?: SelectSubset<T, RecipeIngredientFindFirstArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RecipeIngredient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientFindFirstOrThrowArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeIngredientFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeIngredientFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RecipeIngredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeIngredients
     * const recipeIngredients = await prisma.recipeIngredient.findMany()
     * 
     * // Get first 10 RecipeIngredients
     * const recipeIngredients = await prisma.recipeIngredient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeIngredientWithIdOnly = await prisma.recipeIngredient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeIngredientFindManyArgs>(args?: SelectSubset<T, RecipeIngredientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RecipeIngredient.
     * @param {RecipeIngredientCreateArgs} args - Arguments to create a RecipeIngredient.
     * @example
     * // Create one RecipeIngredient
     * const RecipeIngredient = await prisma.recipeIngredient.create({
     *   data: {
     *     // ... data to create a RecipeIngredient
     *   }
     * })
     * 
     */
    create<T extends RecipeIngredientCreateArgs>(args: SelectSubset<T, RecipeIngredientCreateArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RecipeIngredients.
     * @param {RecipeIngredientCreateManyArgs} args - Arguments to create many RecipeIngredients.
     * @example
     * // Create many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeIngredientCreateManyArgs>(args?: SelectSubset<T, RecipeIngredientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeIngredients and returns the data saved in the database.
     * @param {RecipeIngredientCreateManyAndReturnArgs} args - Arguments to create many RecipeIngredients.
     * @example
     * // Create many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeIngredients and only return the `id`
     * const recipeIngredientWithIdOnly = await prisma.recipeIngredient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeIngredientCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeIngredientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RecipeIngredient.
     * @param {RecipeIngredientDeleteArgs} args - Arguments to delete one RecipeIngredient.
     * @example
     * // Delete one RecipeIngredient
     * const RecipeIngredient = await prisma.recipeIngredient.delete({
     *   where: {
     *     // ... filter to delete one RecipeIngredient
     *   }
     * })
     * 
     */
    delete<T extends RecipeIngredientDeleteArgs>(args: SelectSubset<T, RecipeIngredientDeleteArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RecipeIngredient.
     * @param {RecipeIngredientUpdateArgs} args - Arguments to update one RecipeIngredient.
     * @example
     * // Update one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeIngredientUpdateArgs>(args: SelectSubset<T, RecipeIngredientUpdateArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RecipeIngredients.
     * @param {RecipeIngredientDeleteManyArgs} args - Arguments to filter RecipeIngredients to delete.
     * @example
     * // Delete a few RecipeIngredients
     * const { count } = await prisma.recipeIngredient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeIngredientDeleteManyArgs>(args?: SelectSubset<T, RecipeIngredientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeIngredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeIngredientUpdateManyArgs>(args: SelectSubset<T, RecipeIngredientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RecipeIngredient.
     * @param {RecipeIngredientUpsertArgs} args - Arguments to update or create a RecipeIngredient.
     * @example
     * // Update or create a RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.upsert({
     *   create: {
     *     // ... data to create a RecipeIngredient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeIngredient we want to update
     *   }
     * })
     */
    upsert<T extends RecipeIngredientUpsertArgs>(args: SelectSubset<T, RecipeIngredientUpsertArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RecipeIngredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientCountArgs} args - Arguments to filter RecipeIngredients to count.
     * @example
     * // Count the number of RecipeIngredients
     * const count = await prisma.recipeIngredient.count({
     *   where: {
     *     // ... the filter for the RecipeIngredients we want to count
     *   }
     * })
    **/
    count<T extends RecipeIngredientCountArgs>(
      args?: Subset<T, RecipeIngredientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeIngredientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeIngredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeIngredientAggregateArgs>(args: Subset<T, RecipeIngredientAggregateArgs>): Prisma.PrismaPromise<GetRecipeIngredientAggregateType<T>>

    /**
     * Group by RecipeIngredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeIngredientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeIngredientGroupByArgs['orderBy'] }
        : { orderBy?: RecipeIngredientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeIngredientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeIngredientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeIngredient model
   */
  readonly fields: RecipeIngredientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeIngredient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeIngredientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    food<T extends RecipeIngredient$foodArgs<ExtArgs> = {}>(args?: Subset<T, RecipeIngredient$foodArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    customFood<T extends RecipeIngredient$customFoodArgs<ExtArgs> = {}>(args?: Subset<T, RecipeIngredient$customFoodArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeIngredient model
   */ 
  interface RecipeIngredientFieldRefs {
    readonly id: FieldRef<"RecipeIngredient", 'String'>
    readonly recipeId: FieldRef<"RecipeIngredient", 'String'>
    readonly name: FieldRef<"RecipeIngredient", 'String'>
    readonly foodId: FieldRef<"RecipeIngredient", 'String'>
    readonly customFoodId: FieldRef<"RecipeIngredient", 'String'>
    readonly amount: FieldRef<"RecipeIngredient", 'Float'>
    readonly calories: FieldRef<"RecipeIngredient", 'Float'>
    readonly protein: FieldRef<"RecipeIngredient", 'Float'>
    readonly carbs: FieldRef<"RecipeIngredient", 'Float'>
    readonly fat: FieldRef<"RecipeIngredient", 'Float'>
    readonly fiber: FieldRef<"RecipeIngredient", 'Float'>
    readonly sortOrder: FieldRef<"RecipeIngredient", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RecipeIngredient findUnique
   */
  export type RecipeIngredientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient findUniqueOrThrow
   */
  export type RecipeIngredientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient findFirst
   */
  export type RecipeIngredientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeIngredients.
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeIngredients.
     */
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * RecipeIngredient findFirstOrThrow
   */
  export type RecipeIngredientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeIngredients.
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeIngredients.
     */
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * RecipeIngredient findMany
   */
  export type RecipeIngredientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredients to fetch.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeIngredients.
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * RecipeIngredient create
   */
  export type RecipeIngredientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeIngredient.
     */
    data: XOR<RecipeIngredientCreateInput, RecipeIngredientUncheckedCreateInput>
  }

  /**
   * RecipeIngredient createMany
   */
  export type RecipeIngredientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeIngredients.
     */
    data: RecipeIngredientCreateManyInput | RecipeIngredientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeIngredient createManyAndReturn
   */
  export type RecipeIngredientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RecipeIngredients.
     */
    data: RecipeIngredientCreateManyInput | RecipeIngredientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeIngredient update
   */
  export type RecipeIngredientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeIngredient.
     */
    data: XOR<RecipeIngredientUpdateInput, RecipeIngredientUncheckedUpdateInput>
    /**
     * Choose, which RecipeIngredient to update.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient updateMany
   */
  export type RecipeIngredientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeIngredients.
     */
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyInput>
    /**
     * Filter which RecipeIngredients to update
     */
    where?: RecipeIngredientWhereInput
  }

  /**
   * RecipeIngredient upsert
   */
  export type RecipeIngredientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeIngredient to update in case it exists.
     */
    where: RecipeIngredientWhereUniqueInput
    /**
     * In case the RecipeIngredient found by the `where` argument doesn't exist, create a new RecipeIngredient with this data.
     */
    create: XOR<RecipeIngredientCreateInput, RecipeIngredientUncheckedCreateInput>
    /**
     * In case the RecipeIngredient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeIngredientUpdateInput, RecipeIngredientUncheckedUpdateInput>
  }

  /**
   * RecipeIngredient delete
   */
  export type RecipeIngredientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter which RecipeIngredient to delete.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient deleteMany
   */
  export type RecipeIngredientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeIngredients to delete
     */
    where?: RecipeIngredientWhereInput
  }

  /**
   * RecipeIngredient.food
   */
  export type RecipeIngredient$foodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    where?: FoodWhereInput
  }

  /**
   * RecipeIngredient.customFood
   */
  export type RecipeIngredient$customFoodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    where?: CustomFoodWhereInput
  }

  /**
   * RecipeIngredient without action
   */
  export type RecipeIngredientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
  }


  /**
   * Model FoodLog
   */

  export type AggregateFoodLog = {
    _count: FoodLogCountAggregateOutputType | null
    _avg: FoodLogAvgAggregateOutputType | null
    _sum: FoodLogSumAggregateOutputType | null
    _min: FoodLogMinAggregateOutputType | null
    _max: FoodLogMaxAggregateOutputType | null
  }

  export type FoodLogAvgAggregateOutputType = {
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
  }

  export type FoodLogSumAggregateOutputType = {
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
  }

  export type FoodLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    foodId: string | null
    customFoodId: string | null
    recipeId: string | null
    mealType: string | null
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    logDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoodLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    foodId: string | null
    customFoodId: string | null
    recipeId: string | null
    mealType: string | null
    amount: number | null
    calories: number | null
    protein: number | null
    carbs: number | null
    fat: number | null
    fiber: number | null
    logDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoodLogCountAggregateOutputType = {
    id: number
    userId: number
    foodId: number
    customFoodId: number
    recipeId: number
    mealType: number
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    logDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FoodLogAvgAggregateInputType = {
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
  }

  export type FoodLogSumAggregateInputType = {
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
  }

  export type FoodLogMinAggregateInputType = {
    id?: true
    userId?: true
    foodId?: true
    customFoodId?: true
    recipeId?: true
    mealType?: true
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    logDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoodLogMaxAggregateInputType = {
    id?: true
    userId?: true
    foodId?: true
    customFoodId?: true
    recipeId?: true
    mealType?: true
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    logDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoodLogCountAggregateInputType = {
    id?: true
    userId?: true
    foodId?: true
    customFoodId?: true
    recipeId?: true
    mealType?: true
    amount?: true
    calories?: true
    protein?: true
    carbs?: true
    fat?: true
    fiber?: true
    logDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FoodLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodLog to aggregate.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoodLogs
    **/
    _count?: true | FoodLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoodLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoodLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodLogMaxAggregateInputType
  }

  export type GetFoodLogAggregateType<T extends FoodLogAggregateArgs> = {
        [P in keyof T & keyof AggregateFoodLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoodLog[P]>
      : GetScalarType<T[P], AggregateFoodLog[P]>
  }




  export type FoodLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodLogWhereInput
    orderBy?: FoodLogOrderByWithAggregationInput | FoodLogOrderByWithAggregationInput[]
    by: FoodLogScalarFieldEnum[] | FoodLogScalarFieldEnum
    having?: FoodLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodLogCountAggregateInputType | true
    _avg?: FoodLogAvgAggregateInputType
    _sum?: FoodLogSumAggregateInputType
    _min?: FoodLogMinAggregateInputType
    _max?: FoodLogMaxAggregateInputType
  }

  export type FoodLogGroupByOutputType = {
    id: string
    userId: string
    foodId: string | null
    customFoodId: string | null
    recipeId: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    logDate: Date
    createdAt: Date
    updatedAt: Date
    _count: FoodLogCountAggregateOutputType | null
    _avg: FoodLogAvgAggregateOutputType | null
    _sum: FoodLogSumAggregateOutputType | null
    _min: FoodLogMinAggregateOutputType | null
    _max: FoodLogMaxAggregateOutputType | null
  }

  type GetFoodLogGroupByPayload<T extends FoodLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodLogGroupByOutputType[P]>
            : GetScalarType<T[P], FoodLogGroupByOutputType[P]>
        }
      >
    >


  export type FoodLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    foodId?: boolean
    customFoodId?: boolean
    recipeId?: boolean
    mealType?: boolean
    amount?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    logDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    food?: boolean | FoodLog$foodArgs<ExtArgs>
    customFood?: boolean | FoodLog$customFoodArgs<ExtArgs>
    recipe?: boolean | FoodLog$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["foodLog"]>

  export type FoodLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    foodId?: boolean
    customFoodId?: boolean
    recipeId?: boolean
    mealType?: boolean
    amount?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    logDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    food?: boolean | FoodLog$foodArgs<ExtArgs>
    customFood?: boolean | FoodLog$customFoodArgs<ExtArgs>
    recipe?: boolean | FoodLog$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["foodLog"]>

  export type FoodLogSelectScalar = {
    id?: boolean
    userId?: boolean
    foodId?: boolean
    customFoodId?: boolean
    recipeId?: boolean
    mealType?: boolean
    amount?: boolean
    calories?: boolean
    protein?: boolean
    carbs?: boolean
    fat?: boolean
    fiber?: boolean
    logDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FoodLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    food?: boolean | FoodLog$foodArgs<ExtArgs>
    customFood?: boolean | FoodLog$customFoodArgs<ExtArgs>
    recipe?: boolean | FoodLog$recipeArgs<ExtArgs>
  }
  export type FoodLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    food?: boolean | FoodLog$foodArgs<ExtArgs>
    customFood?: boolean | FoodLog$customFoodArgs<ExtArgs>
    recipe?: boolean | FoodLog$recipeArgs<ExtArgs>
  }

  export type $FoodLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoodLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      food: Prisma.$FoodPayload<ExtArgs> | null
      customFood: Prisma.$CustomFoodPayload<ExtArgs> | null
      recipe: Prisma.$RecipePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      foodId: string | null
      customFoodId: string | null
      recipeId: string | null
      mealType: string
      amount: number
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber: number
      logDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foodLog"]>
    composites: {}
  }

  type FoodLogGetPayload<S extends boolean | null | undefined | FoodLogDefaultArgs> = $Result.GetResult<Prisma.$FoodLogPayload, S>

  type FoodLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FoodLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FoodLogCountAggregateInputType | true
    }

  export interface FoodLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoodLog'], meta: { name: 'FoodLog' } }
    /**
     * Find zero or one FoodLog that matches the filter.
     * @param {FoodLogFindUniqueArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodLogFindUniqueArgs>(args: SelectSubset<T, FoodLogFindUniqueArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FoodLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FoodLogFindUniqueOrThrowArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodLogFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FoodLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogFindFirstArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodLogFindFirstArgs>(args?: SelectSubset<T, FoodLogFindFirstArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FoodLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogFindFirstOrThrowArgs} args - Arguments to find a FoodLog
     * @example
     * // Get one FoodLog
     * const foodLog = await prisma.foodLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodLogFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FoodLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodLogs
     * const foodLogs = await prisma.foodLog.findMany()
     * 
     * // Get first 10 FoodLogs
     * const foodLogs = await prisma.foodLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodLogWithIdOnly = await prisma.foodLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodLogFindManyArgs>(args?: SelectSubset<T, FoodLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FoodLog.
     * @param {FoodLogCreateArgs} args - Arguments to create a FoodLog.
     * @example
     * // Create one FoodLog
     * const FoodLog = await prisma.foodLog.create({
     *   data: {
     *     // ... data to create a FoodLog
     *   }
     * })
     * 
     */
    create<T extends FoodLogCreateArgs>(args: SelectSubset<T, FoodLogCreateArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FoodLogs.
     * @param {FoodLogCreateManyArgs} args - Arguments to create many FoodLogs.
     * @example
     * // Create many FoodLogs
     * const foodLog = await prisma.foodLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodLogCreateManyArgs>(args?: SelectSubset<T, FoodLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FoodLogs and returns the data saved in the database.
     * @param {FoodLogCreateManyAndReturnArgs} args - Arguments to create many FoodLogs.
     * @example
     * // Create many FoodLogs
     * const foodLog = await prisma.foodLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FoodLogs and only return the `id`
     * const foodLogWithIdOnly = await prisma.foodLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodLogCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FoodLog.
     * @param {FoodLogDeleteArgs} args - Arguments to delete one FoodLog.
     * @example
     * // Delete one FoodLog
     * const FoodLog = await prisma.foodLog.delete({
     *   where: {
     *     // ... filter to delete one FoodLog
     *   }
     * })
     * 
     */
    delete<T extends FoodLogDeleteArgs>(args: SelectSubset<T, FoodLogDeleteArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FoodLog.
     * @param {FoodLogUpdateArgs} args - Arguments to update one FoodLog.
     * @example
     * // Update one FoodLog
     * const foodLog = await prisma.foodLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodLogUpdateArgs>(args: SelectSubset<T, FoodLogUpdateArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FoodLogs.
     * @param {FoodLogDeleteManyArgs} args - Arguments to filter FoodLogs to delete.
     * @example
     * // Delete a few FoodLogs
     * const { count } = await prisma.foodLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodLogDeleteManyArgs>(args?: SelectSubset<T, FoodLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodLogs
     * const foodLog = await prisma.foodLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodLogUpdateManyArgs>(args: SelectSubset<T, FoodLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FoodLog.
     * @param {FoodLogUpsertArgs} args - Arguments to update or create a FoodLog.
     * @example
     * // Update or create a FoodLog
     * const foodLog = await prisma.foodLog.upsert({
     *   create: {
     *     // ... data to create a FoodLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodLog we want to update
     *   }
     * })
     */
    upsert<T extends FoodLogUpsertArgs>(args: SelectSubset<T, FoodLogUpsertArgs<ExtArgs>>): Prisma__FoodLogClient<$Result.GetResult<Prisma.$FoodLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FoodLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogCountArgs} args - Arguments to filter FoodLogs to count.
     * @example
     * // Count the number of FoodLogs
     * const count = await prisma.foodLog.count({
     *   where: {
     *     // ... the filter for the FoodLogs we want to count
     *   }
     * })
    **/
    count<T extends FoodLogCountArgs>(
      args?: Subset<T, FoodLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoodLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodLogAggregateArgs>(args: Subset<T, FoodLogAggregateArgs>): Prisma.PrismaPromise<GetFoodLogAggregateType<T>>

    /**
     * Group by FoodLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodLogGroupByArgs['orderBy'] }
        : { orderBy?: FoodLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoodLog model
   */
  readonly fields: FoodLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoodLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    food<T extends FoodLog$foodArgs<ExtArgs> = {}>(args?: Subset<T, FoodLog$foodArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    customFood<T extends FoodLog$customFoodArgs<ExtArgs> = {}>(args?: Subset<T, FoodLog$customFoodArgs<ExtArgs>>): Prisma__CustomFoodClient<$Result.GetResult<Prisma.$CustomFoodPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    recipe<T extends FoodLog$recipeArgs<ExtArgs> = {}>(args?: Subset<T, FoodLog$recipeArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FoodLog model
   */ 
  interface FoodLogFieldRefs {
    readonly id: FieldRef<"FoodLog", 'String'>
    readonly userId: FieldRef<"FoodLog", 'String'>
    readonly foodId: FieldRef<"FoodLog", 'String'>
    readonly customFoodId: FieldRef<"FoodLog", 'String'>
    readonly recipeId: FieldRef<"FoodLog", 'String'>
    readonly mealType: FieldRef<"FoodLog", 'String'>
    readonly amount: FieldRef<"FoodLog", 'Float'>
    readonly calories: FieldRef<"FoodLog", 'Float'>
    readonly protein: FieldRef<"FoodLog", 'Float'>
    readonly carbs: FieldRef<"FoodLog", 'Float'>
    readonly fat: FieldRef<"FoodLog", 'Float'>
    readonly fiber: FieldRef<"FoodLog", 'Float'>
    readonly logDate: FieldRef<"FoodLog", 'DateTime'>
    readonly createdAt: FieldRef<"FoodLog", 'DateTime'>
    readonly updatedAt: FieldRef<"FoodLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FoodLog findUnique
   */
  export type FoodLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog findUniqueOrThrow
   */
  export type FoodLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog findFirst
   */
  export type FoodLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodLogs.
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodLogs.
     */
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * FoodLog findFirstOrThrow
   */
  export type FoodLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLog to fetch.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodLogs.
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodLogs.
     */
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * FoodLog findMany
   */
  export type FoodLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter, which FoodLogs to fetch.
     */
    where?: FoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodLogs to fetch.
     */
    orderBy?: FoodLogOrderByWithRelationInput | FoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoodLogs.
     */
    cursor?: FoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodLogs.
     */
    skip?: number
    distinct?: FoodLogScalarFieldEnum | FoodLogScalarFieldEnum[]
  }

  /**
   * FoodLog create
   */
  export type FoodLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * The data needed to create a FoodLog.
     */
    data: XOR<FoodLogCreateInput, FoodLogUncheckedCreateInput>
  }

  /**
   * FoodLog createMany
   */
  export type FoodLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodLogs.
     */
    data: FoodLogCreateManyInput | FoodLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FoodLog createManyAndReturn
   */
  export type FoodLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FoodLogs.
     */
    data: FoodLogCreateManyInput | FoodLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodLog update
   */
  export type FoodLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * The data needed to update a FoodLog.
     */
    data: XOR<FoodLogUpdateInput, FoodLogUncheckedUpdateInput>
    /**
     * Choose, which FoodLog to update.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog updateMany
   */
  export type FoodLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodLogs.
     */
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyInput>
    /**
     * Filter which FoodLogs to update
     */
    where?: FoodLogWhereInput
  }

  /**
   * FoodLog upsert
   */
  export type FoodLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * The filter to search for the FoodLog to update in case it exists.
     */
    where: FoodLogWhereUniqueInput
    /**
     * In case the FoodLog found by the `where` argument doesn't exist, create a new FoodLog with this data.
     */
    create: XOR<FoodLogCreateInput, FoodLogUncheckedCreateInput>
    /**
     * In case the FoodLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodLogUpdateInput, FoodLogUncheckedUpdateInput>
  }

  /**
   * FoodLog delete
   */
  export type FoodLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
    /**
     * Filter which FoodLog to delete.
     */
    where: FoodLogWhereUniqueInput
  }

  /**
   * FoodLog deleteMany
   */
  export type FoodLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodLogs to delete
     */
    where?: FoodLogWhereInput
  }

  /**
   * FoodLog.food
   */
  export type FoodLog$foodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    where?: FoodWhereInput
  }

  /**
   * FoodLog.customFood
   */
  export type FoodLog$customFoodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFood
     */
    select?: CustomFoodSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFoodInclude<ExtArgs> | null
    where?: CustomFoodWhereInput
  }

  /**
   * FoodLog.recipe
   */
  export type FoodLog$recipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
  }

  /**
   * FoodLog without action
   */
  export type FoodLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodLog
     */
    select?: FoodLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodLogInclude<ExtArgs> | null
  }


  /**
   * Model WaterLog
   */

  export type AggregateWaterLog = {
    _count: WaterLogCountAggregateOutputType | null
    _avg: WaterLogAvgAggregateOutputType | null
    _sum: WaterLogSumAggregateOutputType | null
    _min: WaterLogMinAggregateOutputType | null
    _max: WaterLogMaxAggregateOutputType | null
  }

  export type WaterLogAvgAggregateOutputType = {
    amount: number | null
  }

  export type WaterLogSumAggregateOutputType = {
    amount: number | null
  }

  export type WaterLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    logDate: Date | null
    createdAt: Date | null
  }

  export type WaterLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    logDate: Date | null
    createdAt: Date | null
  }

  export type WaterLogCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    logDate: number
    createdAt: number
    _all: number
  }


  export type WaterLogAvgAggregateInputType = {
    amount?: true
  }

  export type WaterLogSumAggregateInputType = {
    amount?: true
  }

  export type WaterLogMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    logDate?: true
    createdAt?: true
  }

  export type WaterLogMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    logDate?: true
    createdAt?: true
  }

  export type WaterLogCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    logDate?: true
    createdAt?: true
    _all?: true
  }

  export type WaterLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaterLog to aggregate.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WaterLogs
    **/
    _count?: true | WaterLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WaterLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WaterLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WaterLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WaterLogMaxAggregateInputType
  }

  export type GetWaterLogAggregateType<T extends WaterLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWaterLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWaterLog[P]>
      : GetScalarType<T[P], AggregateWaterLog[P]>
  }




  export type WaterLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaterLogWhereInput
    orderBy?: WaterLogOrderByWithAggregationInput | WaterLogOrderByWithAggregationInput[]
    by: WaterLogScalarFieldEnum[] | WaterLogScalarFieldEnum
    having?: WaterLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WaterLogCountAggregateInputType | true
    _avg?: WaterLogAvgAggregateInputType
    _sum?: WaterLogSumAggregateInputType
    _min?: WaterLogMinAggregateInputType
    _max?: WaterLogMaxAggregateInputType
  }

  export type WaterLogGroupByOutputType = {
    id: string
    userId: string
    amount: number
    logDate: Date
    createdAt: Date
    _count: WaterLogCountAggregateOutputType | null
    _avg: WaterLogAvgAggregateOutputType | null
    _sum: WaterLogSumAggregateOutputType | null
    _min: WaterLogMinAggregateOutputType | null
    _max: WaterLogMaxAggregateOutputType | null
  }

  type GetWaterLogGroupByPayload<T extends WaterLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WaterLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WaterLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WaterLogGroupByOutputType[P]>
            : GetScalarType<T[P], WaterLogGroupByOutputType[P]>
        }
      >
    >


  export type WaterLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    logDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterLog"]>

  export type WaterLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    logDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["waterLog"]>

  export type WaterLogSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    logDate?: boolean
    createdAt?: boolean
  }

  export type WaterLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WaterLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WaterLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WaterLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      logDate: Date
      createdAt: Date
    }, ExtArgs["result"]["waterLog"]>
    composites: {}
  }

  type WaterLogGetPayload<S extends boolean | null | undefined | WaterLogDefaultArgs> = $Result.GetResult<Prisma.$WaterLogPayload, S>

  type WaterLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WaterLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WaterLogCountAggregateInputType | true
    }

  export interface WaterLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WaterLog'], meta: { name: 'WaterLog' } }
    /**
     * Find zero or one WaterLog that matches the filter.
     * @param {WaterLogFindUniqueArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WaterLogFindUniqueArgs>(args: SelectSubset<T, WaterLogFindUniqueArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WaterLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WaterLogFindUniqueOrThrowArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WaterLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WaterLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WaterLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogFindFirstArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WaterLogFindFirstArgs>(args?: SelectSubset<T, WaterLogFindFirstArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WaterLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogFindFirstOrThrowArgs} args - Arguments to find a WaterLog
     * @example
     * // Get one WaterLog
     * const waterLog = await prisma.waterLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WaterLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WaterLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WaterLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WaterLogs
     * const waterLogs = await prisma.waterLog.findMany()
     * 
     * // Get first 10 WaterLogs
     * const waterLogs = await prisma.waterLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const waterLogWithIdOnly = await prisma.waterLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WaterLogFindManyArgs>(args?: SelectSubset<T, WaterLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WaterLog.
     * @param {WaterLogCreateArgs} args - Arguments to create a WaterLog.
     * @example
     * // Create one WaterLog
     * const WaterLog = await prisma.waterLog.create({
     *   data: {
     *     // ... data to create a WaterLog
     *   }
     * })
     * 
     */
    create<T extends WaterLogCreateArgs>(args: SelectSubset<T, WaterLogCreateArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WaterLogs.
     * @param {WaterLogCreateManyArgs} args - Arguments to create many WaterLogs.
     * @example
     * // Create many WaterLogs
     * const waterLog = await prisma.waterLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WaterLogCreateManyArgs>(args?: SelectSubset<T, WaterLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WaterLogs and returns the data saved in the database.
     * @param {WaterLogCreateManyAndReturnArgs} args - Arguments to create many WaterLogs.
     * @example
     * // Create many WaterLogs
     * const waterLog = await prisma.waterLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WaterLogs and only return the `id`
     * const waterLogWithIdOnly = await prisma.waterLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WaterLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WaterLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WaterLog.
     * @param {WaterLogDeleteArgs} args - Arguments to delete one WaterLog.
     * @example
     * // Delete one WaterLog
     * const WaterLog = await prisma.waterLog.delete({
     *   where: {
     *     // ... filter to delete one WaterLog
     *   }
     * })
     * 
     */
    delete<T extends WaterLogDeleteArgs>(args: SelectSubset<T, WaterLogDeleteArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WaterLog.
     * @param {WaterLogUpdateArgs} args - Arguments to update one WaterLog.
     * @example
     * // Update one WaterLog
     * const waterLog = await prisma.waterLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WaterLogUpdateArgs>(args: SelectSubset<T, WaterLogUpdateArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WaterLogs.
     * @param {WaterLogDeleteManyArgs} args - Arguments to filter WaterLogs to delete.
     * @example
     * // Delete a few WaterLogs
     * const { count } = await prisma.waterLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WaterLogDeleteManyArgs>(args?: SelectSubset<T, WaterLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WaterLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WaterLogs
     * const waterLog = await prisma.waterLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WaterLogUpdateManyArgs>(args: SelectSubset<T, WaterLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WaterLog.
     * @param {WaterLogUpsertArgs} args - Arguments to update or create a WaterLog.
     * @example
     * // Update or create a WaterLog
     * const waterLog = await prisma.waterLog.upsert({
     *   create: {
     *     // ... data to create a WaterLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WaterLog we want to update
     *   }
     * })
     */
    upsert<T extends WaterLogUpsertArgs>(args: SelectSubset<T, WaterLogUpsertArgs<ExtArgs>>): Prisma__WaterLogClient<$Result.GetResult<Prisma.$WaterLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WaterLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogCountArgs} args - Arguments to filter WaterLogs to count.
     * @example
     * // Count the number of WaterLogs
     * const count = await prisma.waterLog.count({
     *   where: {
     *     // ... the filter for the WaterLogs we want to count
     *   }
     * })
    **/
    count<T extends WaterLogCountArgs>(
      args?: Subset<T, WaterLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WaterLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WaterLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WaterLogAggregateArgs>(args: Subset<T, WaterLogAggregateArgs>): Prisma.PrismaPromise<GetWaterLogAggregateType<T>>

    /**
     * Group by WaterLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaterLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WaterLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WaterLogGroupByArgs['orderBy'] }
        : { orderBy?: WaterLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WaterLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWaterLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WaterLog model
   */
  readonly fields: WaterLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WaterLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WaterLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WaterLog model
   */ 
  interface WaterLogFieldRefs {
    readonly id: FieldRef<"WaterLog", 'String'>
    readonly userId: FieldRef<"WaterLog", 'String'>
    readonly amount: FieldRef<"WaterLog", 'Float'>
    readonly logDate: FieldRef<"WaterLog", 'DateTime'>
    readonly createdAt: FieldRef<"WaterLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WaterLog findUnique
   */
  export type WaterLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog findUniqueOrThrow
   */
  export type WaterLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog findFirst
   */
  export type WaterLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaterLogs.
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterLogs.
     */
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * WaterLog findFirstOrThrow
   */
  export type WaterLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLog to fetch.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WaterLogs.
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WaterLogs.
     */
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * WaterLog findMany
   */
  export type WaterLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter, which WaterLogs to fetch.
     */
    where?: WaterLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WaterLogs to fetch.
     */
    orderBy?: WaterLogOrderByWithRelationInput | WaterLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WaterLogs.
     */
    cursor?: WaterLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WaterLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WaterLogs.
     */
    skip?: number
    distinct?: WaterLogScalarFieldEnum | WaterLogScalarFieldEnum[]
  }

  /**
   * WaterLog create
   */
  export type WaterLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WaterLog.
     */
    data: XOR<WaterLogCreateInput, WaterLogUncheckedCreateInput>
  }

  /**
   * WaterLog createMany
   */
  export type WaterLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WaterLogs.
     */
    data: WaterLogCreateManyInput | WaterLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WaterLog createManyAndReturn
   */
  export type WaterLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WaterLogs.
     */
    data: WaterLogCreateManyInput | WaterLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WaterLog update
   */
  export type WaterLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WaterLog.
     */
    data: XOR<WaterLogUpdateInput, WaterLogUncheckedUpdateInput>
    /**
     * Choose, which WaterLog to update.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog updateMany
   */
  export type WaterLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WaterLogs.
     */
    data: XOR<WaterLogUpdateManyMutationInput, WaterLogUncheckedUpdateManyInput>
    /**
     * Filter which WaterLogs to update
     */
    where?: WaterLogWhereInput
  }

  /**
   * WaterLog upsert
   */
  export type WaterLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WaterLog to update in case it exists.
     */
    where: WaterLogWhereUniqueInput
    /**
     * In case the WaterLog found by the `where` argument doesn't exist, create a new WaterLog with this data.
     */
    create: XOR<WaterLogCreateInput, WaterLogUncheckedCreateInput>
    /**
     * In case the WaterLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WaterLogUpdateInput, WaterLogUncheckedUpdateInput>
  }

  /**
   * WaterLog delete
   */
  export type WaterLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
    /**
     * Filter which WaterLog to delete.
     */
    where: WaterLogWhereUniqueInput
  }

  /**
   * WaterLog deleteMany
   */
  export type WaterLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WaterLogs to delete
     */
    where?: WaterLogWhereInput
  }

  /**
   * WaterLog without action
   */
  export type WaterLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WaterLog
     */
    select?: WaterLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WaterLogInclude<ExtArgs> | null
  }


  /**
   * Model WeightLog
   */

  export type AggregateWeightLog = {
    _count: WeightLogCountAggregateOutputType | null
    _avg: WeightLogAvgAggregateOutputType | null
    _sum: WeightLogSumAggregateOutputType | null
    _min: WeightLogMinAggregateOutputType | null
    _max: WeightLogMaxAggregateOutputType | null
  }

  export type WeightLogAvgAggregateOutputType = {
    weight: number | null
  }

  export type WeightLogSumAggregateOutputType = {
    weight: number | null
  }

  export type WeightLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    weight: number | null
    note: string | null
    logDate: Date | null
    createdAt: Date | null
  }

  export type WeightLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    weight: number | null
    note: string | null
    logDate: Date | null
    createdAt: Date | null
  }

  export type WeightLogCountAggregateOutputType = {
    id: number
    userId: number
    weight: number
    note: number
    logDate: number
    createdAt: number
    _all: number
  }


  export type WeightLogAvgAggregateInputType = {
    weight?: true
  }

  export type WeightLogSumAggregateInputType = {
    weight?: true
  }

  export type WeightLogMinAggregateInputType = {
    id?: true
    userId?: true
    weight?: true
    note?: true
    logDate?: true
    createdAt?: true
  }

  export type WeightLogMaxAggregateInputType = {
    id?: true
    userId?: true
    weight?: true
    note?: true
    logDate?: true
    createdAt?: true
  }

  export type WeightLogCountAggregateInputType = {
    id?: true
    userId?: true
    weight?: true
    note?: true
    logDate?: true
    createdAt?: true
    _all?: true
  }

  export type WeightLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightLog to aggregate.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeightLogs
    **/
    _count?: true | WeightLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeightLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeightLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeightLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeightLogMaxAggregateInputType
  }

  export type GetWeightLogAggregateType<T extends WeightLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWeightLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeightLog[P]>
      : GetScalarType<T[P], AggregateWeightLog[P]>
  }




  export type WeightLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeightLogWhereInput
    orderBy?: WeightLogOrderByWithAggregationInput | WeightLogOrderByWithAggregationInput[]
    by: WeightLogScalarFieldEnum[] | WeightLogScalarFieldEnum
    having?: WeightLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeightLogCountAggregateInputType | true
    _avg?: WeightLogAvgAggregateInputType
    _sum?: WeightLogSumAggregateInputType
    _min?: WeightLogMinAggregateInputType
    _max?: WeightLogMaxAggregateInputType
  }

  export type WeightLogGroupByOutputType = {
    id: string
    userId: string
    weight: number
    note: string | null
    logDate: Date
    createdAt: Date
    _count: WeightLogCountAggregateOutputType | null
    _avg: WeightLogAvgAggregateOutputType | null
    _sum: WeightLogSumAggregateOutputType | null
    _min: WeightLogMinAggregateOutputType | null
    _max: WeightLogMaxAggregateOutputType | null
  }

  type GetWeightLogGroupByPayload<T extends WeightLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeightLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeightLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeightLogGroupByOutputType[P]>
            : GetScalarType<T[P], WeightLogGroupByOutputType[P]>
        }
      >
    >


  export type WeightLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weight?: boolean
    note?: boolean
    logDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightLog"]>

  export type WeightLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    weight?: boolean
    note?: boolean
    logDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weightLog"]>

  export type WeightLogSelectScalar = {
    id?: boolean
    userId?: boolean
    weight?: boolean
    note?: boolean
    logDate?: boolean
    createdAt?: boolean
  }

  export type WeightLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeightLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WeightLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeightLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      weight: number
      note: string | null
      logDate: Date
      createdAt: Date
    }, ExtArgs["result"]["weightLog"]>
    composites: {}
  }

  type WeightLogGetPayload<S extends boolean | null | undefined | WeightLogDefaultArgs> = $Result.GetResult<Prisma.$WeightLogPayload, S>

  type WeightLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WeightLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WeightLogCountAggregateInputType | true
    }

  export interface WeightLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeightLog'], meta: { name: 'WeightLog' } }
    /**
     * Find zero or one WeightLog that matches the filter.
     * @param {WeightLogFindUniqueArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeightLogFindUniqueArgs>(args: SelectSubset<T, WeightLogFindUniqueArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WeightLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WeightLogFindUniqueOrThrowArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeightLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WeightLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WeightLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogFindFirstArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeightLogFindFirstArgs>(args?: SelectSubset<T, WeightLogFindFirstArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WeightLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogFindFirstOrThrowArgs} args - Arguments to find a WeightLog
     * @example
     * // Get one WeightLog
     * const weightLog = await prisma.weightLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeightLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WeightLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WeightLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeightLogs
     * const weightLogs = await prisma.weightLog.findMany()
     * 
     * // Get first 10 WeightLogs
     * const weightLogs = await prisma.weightLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weightLogWithIdOnly = await prisma.weightLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeightLogFindManyArgs>(args?: SelectSubset<T, WeightLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WeightLog.
     * @param {WeightLogCreateArgs} args - Arguments to create a WeightLog.
     * @example
     * // Create one WeightLog
     * const WeightLog = await prisma.weightLog.create({
     *   data: {
     *     // ... data to create a WeightLog
     *   }
     * })
     * 
     */
    create<T extends WeightLogCreateArgs>(args: SelectSubset<T, WeightLogCreateArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WeightLogs.
     * @param {WeightLogCreateManyArgs} args - Arguments to create many WeightLogs.
     * @example
     * // Create many WeightLogs
     * const weightLog = await prisma.weightLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeightLogCreateManyArgs>(args?: SelectSubset<T, WeightLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeightLogs and returns the data saved in the database.
     * @param {WeightLogCreateManyAndReturnArgs} args - Arguments to create many WeightLogs.
     * @example
     * // Create many WeightLogs
     * const weightLog = await prisma.weightLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeightLogs and only return the `id`
     * const weightLogWithIdOnly = await prisma.weightLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeightLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WeightLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WeightLog.
     * @param {WeightLogDeleteArgs} args - Arguments to delete one WeightLog.
     * @example
     * // Delete one WeightLog
     * const WeightLog = await prisma.weightLog.delete({
     *   where: {
     *     // ... filter to delete one WeightLog
     *   }
     * })
     * 
     */
    delete<T extends WeightLogDeleteArgs>(args: SelectSubset<T, WeightLogDeleteArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WeightLog.
     * @param {WeightLogUpdateArgs} args - Arguments to update one WeightLog.
     * @example
     * // Update one WeightLog
     * const weightLog = await prisma.weightLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeightLogUpdateArgs>(args: SelectSubset<T, WeightLogUpdateArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WeightLogs.
     * @param {WeightLogDeleteManyArgs} args - Arguments to filter WeightLogs to delete.
     * @example
     * // Delete a few WeightLogs
     * const { count } = await prisma.weightLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeightLogDeleteManyArgs>(args?: SelectSubset<T, WeightLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeightLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeightLogs
     * const weightLog = await prisma.weightLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeightLogUpdateManyArgs>(args: SelectSubset<T, WeightLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WeightLog.
     * @param {WeightLogUpsertArgs} args - Arguments to update or create a WeightLog.
     * @example
     * // Update or create a WeightLog
     * const weightLog = await prisma.weightLog.upsert({
     *   create: {
     *     // ... data to create a WeightLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeightLog we want to update
     *   }
     * })
     */
    upsert<T extends WeightLogUpsertArgs>(args: SelectSubset<T, WeightLogUpsertArgs<ExtArgs>>): Prisma__WeightLogClient<$Result.GetResult<Prisma.$WeightLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WeightLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogCountArgs} args - Arguments to filter WeightLogs to count.
     * @example
     * // Count the number of WeightLogs
     * const count = await prisma.weightLog.count({
     *   where: {
     *     // ... the filter for the WeightLogs we want to count
     *   }
     * })
    **/
    count<T extends WeightLogCountArgs>(
      args?: Subset<T, WeightLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeightLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeightLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeightLogAggregateArgs>(args: Subset<T, WeightLogAggregateArgs>): Prisma.PrismaPromise<GetWeightLogAggregateType<T>>

    /**
     * Group by WeightLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeightLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeightLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeightLogGroupByArgs['orderBy'] }
        : { orderBy?: WeightLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeightLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeightLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeightLog model
   */
  readonly fields: WeightLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeightLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeightLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeightLog model
   */ 
  interface WeightLogFieldRefs {
    readonly id: FieldRef<"WeightLog", 'String'>
    readonly userId: FieldRef<"WeightLog", 'String'>
    readonly weight: FieldRef<"WeightLog", 'Float'>
    readonly note: FieldRef<"WeightLog", 'String'>
    readonly logDate: FieldRef<"WeightLog", 'DateTime'>
    readonly createdAt: FieldRef<"WeightLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeightLog findUnique
   */
  export type WeightLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog findUniqueOrThrow
   */
  export type WeightLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog findFirst
   */
  export type WeightLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightLogs.
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightLogs.
     */
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * WeightLog findFirstOrThrow
   */
  export type WeightLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLog to fetch.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeightLogs.
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeightLogs.
     */
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * WeightLog findMany
   */
  export type WeightLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter, which WeightLogs to fetch.
     */
    where?: WeightLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeightLogs to fetch.
     */
    orderBy?: WeightLogOrderByWithRelationInput | WeightLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeightLogs.
     */
    cursor?: WeightLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeightLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeightLogs.
     */
    skip?: number
    distinct?: WeightLogScalarFieldEnum | WeightLogScalarFieldEnum[]
  }

  /**
   * WeightLog create
   */
  export type WeightLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WeightLog.
     */
    data: XOR<WeightLogCreateInput, WeightLogUncheckedCreateInput>
  }

  /**
   * WeightLog createMany
   */
  export type WeightLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeightLogs.
     */
    data: WeightLogCreateManyInput | WeightLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeightLog createManyAndReturn
   */
  export type WeightLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WeightLogs.
     */
    data: WeightLogCreateManyInput | WeightLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeightLog update
   */
  export type WeightLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WeightLog.
     */
    data: XOR<WeightLogUpdateInput, WeightLogUncheckedUpdateInput>
    /**
     * Choose, which WeightLog to update.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog updateMany
   */
  export type WeightLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeightLogs.
     */
    data: XOR<WeightLogUpdateManyMutationInput, WeightLogUncheckedUpdateManyInput>
    /**
     * Filter which WeightLogs to update
     */
    where?: WeightLogWhereInput
  }

  /**
   * WeightLog upsert
   */
  export type WeightLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WeightLog to update in case it exists.
     */
    where: WeightLogWhereUniqueInput
    /**
     * In case the WeightLog found by the `where` argument doesn't exist, create a new WeightLog with this data.
     */
    create: XOR<WeightLogCreateInput, WeightLogUncheckedCreateInput>
    /**
     * In case the WeightLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeightLogUpdateInput, WeightLogUncheckedUpdateInput>
  }

  /**
   * WeightLog delete
   */
  export type WeightLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
    /**
     * Filter which WeightLog to delete.
     */
    where: WeightLogWhereUniqueInput
  }

  /**
   * WeightLog deleteMany
   */
  export type WeightLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeightLogs to delete
     */
    where?: WeightLogWhereInput
  }

  /**
   * WeightLog without action
   */
  export type WeightLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeightLog
     */
    select?: WeightLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeightLogInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogAvgAggregateOutputType = {
    duration: number | null
    caloriesBurned: number | null
    sets: number | null
    reps: number | null
    weightUsed: number | null
    startWeight: number | null
    startReps: number | null
    endWeight: number | null
    endReps: number | null
    totalVolume: number | null
    distance: number | null
    speed: number | null
    pace: number | null
  }

  export type ActivityLogSumAggregateOutputType = {
    duration: number | null
    caloriesBurned: number | null
    sets: number | null
    reps: number | null
    weightUsed: number | null
    startWeight: number | null
    startReps: number | null
    endWeight: number | null
    endReps: number | null
    totalVolume: number | null
    distance: number | null
    speed: number | null
    pace: number | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    activityType: string | null
    name: string | null
    duration: number | null
    caloriesBurned: number | null
    notes: string | null
    sets: number | null
    reps: number | null
    weightUsed: number | null
    muscleGroup: string | null
    startWeight: number | null
    startReps: number | null
    endWeight: number | null
    endReps: number | null
    totalVolume: number | null
    distance: number | null
    speed: number | null
    pace: number | null
    stroke: string | null
    logDate: Date | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    activityType: string | null
    name: string | null
    duration: number | null
    caloriesBurned: number | null
    notes: string | null
    sets: number | null
    reps: number | null
    weightUsed: number | null
    muscleGroup: string | null
    startWeight: number | null
    startReps: number | null
    endWeight: number | null
    endReps: number | null
    totalVolume: number | null
    distance: number | null
    speed: number | null
    pace: number | null
    stroke: string | null
    logDate: Date | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    activityType: number
    name: number
    duration: number
    caloriesBurned: number
    notes: number
    sets: number
    reps: number
    weightUsed: number
    muscleGroup: number
    startWeight: number
    startReps: number
    endWeight: number
    endReps: number
    totalVolume: number
    distance: number
    speed: number
    pace: number
    stroke: number
    logDate: number
    createdAt: number
    _all: number
  }


  export type ActivityLogAvgAggregateInputType = {
    duration?: true
    caloriesBurned?: true
    sets?: true
    reps?: true
    weightUsed?: true
    startWeight?: true
    startReps?: true
    endWeight?: true
    endReps?: true
    totalVolume?: true
    distance?: true
    speed?: true
    pace?: true
  }

  export type ActivityLogSumAggregateInputType = {
    duration?: true
    caloriesBurned?: true
    sets?: true
    reps?: true
    weightUsed?: true
    startWeight?: true
    startReps?: true
    endWeight?: true
    endReps?: true
    totalVolume?: true
    distance?: true
    speed?: true
    pace?: true
  }

  export type ActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    activityType?: true
    name?: true
    duration?: true
    caloriesBurned?: true
    notes?: true
    sets?: true
    reps?: true
    weightUsed?: true
    muscleGroup?: true
    startWeight?: true
    startReps?: true
    endWeight?: true
    endReps?: true
    totalVolume?: true
    distance?: true
    speed?: true
    pace?: true
    stroke?: true
    logDate?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    activityType?: true
    name?: true
    duration?: true
    caloriesBurned?: true
    notes?: true
    sets?: true
    reps?: true
    weightUsed?: true
    muscleGroup?: true
    startWeight?: true
    startReps?: true
    endWeight?: true
    endReps?: true
    totalVolume?: true
    distance?: true
    speed?: true
    pace?: true
    stroke?: true
    logDate?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    activityType?: true
    name?: true
    duration?: true
    caloriesBurned?: true
    notes?: true
    sets?: true
    reps?: true
    weightUsed?: true
    muscleGroup?: true
    startWeight?: true
    startReps?: true
    endWeight?: true
    endReps?: true
    totalVolume?: true
    distance?: true
    speed?: true
    pace?: true
    stroke?: true
    logDate?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _avg?: ActivityLogAvgAggregateInputType
    _sum?: ActivityLogSumAggregateInputType
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    userId: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes: string | null
    sets: number | null
    reps: number | null
    weightUsed: number | null
    muscleGroup: string | null
    startWeight: number | null
    startReps: number | null
    endWeight: number | null
    endReps: number | null
    totalVolume: number | null
    distance: number | null
    speed: number | null
    pace: number | null
    stroke: string | null
    logDate: Date
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    activityType?: boolean
    name?: boolean
    duration?: boolean
    caloriesBurned?: boolean
    notes?: boolean
    sets?: boolean
    reps?: boolean
    weightUsed?: boolean
    muscleGroup?: boolean
    startWeight?: boolean
    startReps?: boolean
    endWeight?: boolean
    endReps?: boolean
    totalVolume?: boolean
    distance?: boolean
    speed?: boolean
    pace?: boolean
    stroke?: boolean
    logDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    activityType?: boolean
    name?: boolean
    duration?: boolean
    caloriesBurned?: boolean
    notes?: boolean
    sets?: boolean
    reps?: boolean
    weightUsed?: boolean
    muscleGroup?: boolean
    startWeight?: boolean
    startReps?: boolean
    endWeight?: boolean
    endReps?: boolean
    totalVolume?: boolean
    distance?: boolean
    speed?: boolean
    pace?: boolean
    stroke?: boolean
    logDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    activityType?: boolean
    name?: boolean
    duration?: boolean
    caloriesBurned?: boolean
    notes?: boolean
    sets?: boolean
    reps?: boolean
    weightUsed?: boolean
    muscleGroup?: boolean
    startWeight?: boolean
    startReps?: boolean
    endWeight?: boolean
    endReps?: boolean
    totalVolume?: boolean
    distance?: boolean
    speed?: boolean
    pace?: boolean
    stroke?: boolean
    logDate?: boolean
    createdAt?: boolean
  }

  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      activityType: string
      name: string
      duration: number
      caloriesBurned: number
      notes: string | null
      sets: number | null
      reps: number | null
      weightUsed: number | null
      muscleGroup: string | null
      startWeight: number | null
      startReps: number | null
      endWeight: number | null
      endReps: number | null
      totalVolume: number | null
      distance: number | null
      speed: number | null
      pace: number | null
      stroke: string | null
      logDate: Date
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */ 
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly activityType: FieldRef<"ActivityLog", 'String'>
    readonly name: FieldRef<"ActivityLog", 'String'>
    readonly duration: FieldRef<"ActivityLog", 'Float'>
    readonly caloriesBurned: FieldRef<"ActivityLog", 'Float'>
    readonly notes: FieldRef<"ActivityLog", 'String'>
    readonly sets: FieldRef<"ActivityLog", 'Int'>
    readonly reps: FieldRef<"ActivityLog", 'Int'>
    readonly weightUsed: FieldRef<"ActivityLog", 'Float'>
    readonly muscleGroup: FieldRef<"ActivityLog", 'String'>
    readonly startWeight: FieldRef<"ActivityLog", 'Float'>
    readonly startReps: FieldRef<"ActivityLog", 'Int'>
    readonly endWeight: FieldRef<"ActivityLog", 'Float'>
    readonly endReps: FieldRef<"ActivityLog", 'Int'>
    readonly totalVolume: FieldRef<"ActivityLog", 'Float'>
    readonly distance: FieldRef<"ActivityLog", 'Float'>
    readonly speed: FieldRef<"ActivityLog", 'Float'>
    readonly pace: FieldRef<"ActivityLog", 'Float'>
    readonly stroke: FieldRef<"ActivityLog", 'String'>
    readonly logDate: FieldRef<"ActivityLog", 'DateTime'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    message: number
    read: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: string
    title: string
    message: string
    read: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      title: string
      message: string
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    age: 'age',
    sex: 'sex',
    height: 'height',
    currentWeight: 'currentWeight',
    goalWeight: 'goalWeight',
    activityLevel: 'activityLevel',
    gymDaysPerWeek: 'gymDaysPerWeek',
    dailyWalkKm: 'dailyWalkKm',
    gymMinutesPerSession: 'gymMinutesPerSession',
    goal: 'goal',
    goalDate: 'goalDate',
    profileCompleted: 'profileCompleted',
    isAdmin: 'isAdmin',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    darkMode: 'darkMode',
    units: 'units',
    waterGoal: 'waterGoal',
    calorieGoal: 'calorieGoal',
    proteinGoal: 'proteinGoal',
    carbsGoal: 'carbsGoal',
    fatGoal: 'fatGoal',
    notifWater: 'notifWater',
    notifMeals: 'notifMeals',
    notifWorkout: 'notifWorkout',
    notifWeight: 'notifWeight',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const FoodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    servingSize: 'servingSize',
    servingUnit: 'servingUnit',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    fiber: 'fiber',
    sugar: 'sugar',
    sodium: 'sodium',
    barcode: 'barcode',
    externalSource: 'externalSource',
    externalId: 'externalId',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FoodScalarFieldEnum = (typeof FoodScalarFieldEnum)[keyof typeof FoodScalarFieldEnum]


  export const CustomFoodScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    category: 'category',
    servingSize: 'servingSize',
    servingUnit: 'servingUnit',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    fiber: 'fiber',
    sugar: 'sugar',
    sodium: 'sodium',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomFoodScalarFieldEnum = (typeof CustomFoodScalarFieldEnum)[keyof typeof CustomFoodScalarFieldEnum]


  export const RecipeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    servings: 'servings',
    servingSize: 'servingSize',
    servingUnit: 'servingUnit',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    fiber: 'fiber',
    sugar: 'sugar',
    sodium: 'sodium',
    totalWeight: 'totalWeight',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum]


  export const RecipeIngredientScalarFieldEnum: {
    id: 'id',
    recipeId: 'recipeId',
    name: 'name',
    foodId: 'foodId',
    customFoodId: 'customFoodId',
    amount: 'amount',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    fiber: 'fiber',
    sortOrder: 'sortOrder'
  };

  export type RecipeIngredientScalarFieldEnum = (typeof RecipeIngredientScalarFieldEnum)[keyof typeof RecipeIngredientScalarFieldEnum]


  export const FoodLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    foodId: 'foodId',
    customFoodId: 'customFoodId',
    recipeId: 'recipeId',
    mealType: 'mealType',
    amount: 'amount',
    calories: 'calories',
    protein: 'protein',
    carbs: 'carbs',
    fat: 'fat',
    fiber: 'fiber',
    logDate: 'logDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FoodLogScalarFieldEnum = (typeof FoodLogScalarFieldEnum)[keyof typeof FoodLogScalarFieldEnum]


  export const WaterLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    logDate: 'logDate',
    createdAt: 'createdAt'
  };

  export type WaterLogScalarFieldEnum = (typeof WaterLogScalarFieldEnum)[keyof typeof WaterLogScalarFieldEnum]


  export const WeightLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    weight: 'weight',
    note: 'note',
    logDate: 'logDate',
    createdAt: 'createdAt'
  };

  export type WeightLogScalarFieldEnum = (typeof WeightLogScalarFieldEnum)[keyof typeof WeightLogScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    activityType: 'activityType',
    name: 'name',
    duration: 'duration',
    caloriesBurned: 'caloriesBurned',
    notes: 'notes',
    sets: 'sets',
    reps: 'reps',
    weightUsed: 'weightUsed',
    muscleGroup: 'muscleGroup',
    startWeight: 'startWeight',
    startReps: 'startReps',
    endWeight: 'endWeight',
    endReps: 'endReps',
    totalVolume: 'totalVolume',
    distance: 'distance',
    speed: 'speed',
    pace: 'pace',
    stroke: 'stroke',
    logDate: 'logDate',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    age?: IntNullableFilter<"User"> | number | null
    sex?: StringNullableFilter<"User"> | string | null
    height?: FloatNullableFilter<"User"> | number | null
    currentWeight?: FloatNullableFilter<"User"> | number | null
    goalWeight?: FloatNullableFilter<"User"> | number | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    gymDaysPerWeek?: IntNullableFilter<"User"> | number | null
    dailyWalkKm?: FloatNullableFilter<"User"> | number | null
    gymMinutesPerSession?: IntNullableFilter<"User"> | number | null
    goal?: StringNullableFilter<"User"> | string | null
    goalDate?: DateTimeNullableFilter<"User"> | Date | string | null
    profileCompleted?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    settings?: XOR<SettingsNullableRelationFilter, SettingsWhereInput> | null
    foodLogs?: FoodLogListRelationFilter
    waterLogs?: WaterLogListRelationFilter
    weightLogs?: WeightLogListRelationFilter
    activities?: ActivityLogListRelationFilter
    customFoods?: CustomFoodListRelationFilter
    recipes?: RecipeListRelationFilter
    notifications?: NotificationListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    currentWeight?: SortOrderInput | SortOrder
    goalWeight?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    gymDaysPerWeek?: SortOrderInput | SortOrder
    dailyWalkKm?: SortOrderInput | SortOrder
    gymMinutesPerSession?: SortOrderInput | SortOrder
    goal?: SortOrderInput | SortOrder
    goalDate?: SortOrderInput | SortOrder
    profileCompleted?: SortOrder
    isAdmin?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settings?: SettingsOrderByWithRelationInput
    foodLogs?: FoodLogOrderByRelationAggregateInput
    waterLogs?: WaterLogOrderByRelationAggregateInput
    weightLogs?: WeightLogOrderByRelationAggregateInput
    activities?: ActivityLogOrderByRelationAggregateInput
    customFoods?: CustomFoodOrderByRelationAggregateInput
    recipes?: RecipeOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    age?: IntNullableFilter<"User"> | number | null
    sex?: StringNullableFilter<"User"> | string | null
    height?: FloatNullableFilter<"User"> | number | null
    currentWeight?: FloatNullableFilter<"User"> | number | null
    goalWeight?: FloatNullableFilter<"User"> | number | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    gymDaysPerWeek?: IntNullableFilter<"User"> | number | null
    dailyWalkKm?: FloatNullableFilter<"User"> | number | null
    gymMinutesPerSession?: IntNullableFilter<"User"> | number | null
    goal?: StringNullableFilter<"User"> | string | null
    goalDate?: DateTimeNullableFilter<"User"> | Date | string | null
    profileCompleted?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    settings?: XOR<SettingsNullableRelationFilter, SettingsWhereInput> | null
    foodLogs?: FoodLogListRelationFilter
    waterLogs?: WaterLogListRelationFilter
    weightLogs?: WeightLogListRelationFilter
    activities?: ActivityLogListRelationFilter
    customFoods?: CustomFoodListRelationFilter
    recipes?: RecipeListRelationFilter
    notifications?: NotificationListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrderInput | SortOrder
    sex?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    currentWeight?: SortOrderInput | SortOrder
    goalWeight?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    gymDaysPerWeek?: SortOrderInput | SortOrder
    dailyWalkKm?: SortOrderInput | SortOrder
    gymMinutesPerSession?: SortOrderInput | SortOrder
    goal?: SortOrderInput | SortOrder
    goalDate?: SortOrderInput | SortOrder
    profileCompleted?: SortOrder
    isAdmin?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    sex?: StringNullableWithAggregatesFilter<"User"> | string | null
    height?: FloatNullableWithAggregatesFilter<"User"> | number | null
    currentWeight?: FloatNullableWithAggregatesFilter<"User"> | number | null
    goalWeight?: FloatNullableWithAggregatesFilter<"User"> | number | null
    activityLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    gymDaysPerWeek?: IntNullableWithAggregatesFilter<"User"> | number | null
    dailyWalkKm?: FloatNullableWithAggregatesFilter<"User"> | number | null
    gymMinutesPerSession?: IntNullableWithAggregatesFilter<"User"> | number | null
    goal?: StringNullableWithAggregatesFilter<"User"> | string | null
    goalDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    profileCompleted?: BoolWithAggregatesFilter<"User"> | boolean
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: StringFilter<"Settings"> | string
    userId?: StringFilter<"Settings"> | string
    darkMode?: BoolFilter<"Settings"> | boolean
    units?: StringFilter<"Settings"> | string
    waterGoal?: FloatFilter<"Settings"> | number
    calorieGoal?: FloatNullableFilter<"Settings"> | number | null
    proteinGoal?: FloatNullableFilter<"Settings"> | number | null
    carbsGoal?: FloatNullableFilter<"Settings"> | number | null
    fatGoal?: FloatNullableFilter<"Settings"> | number | null
    notifWater?: BoolFilter<"Settings"> | boolean
    notifMeals?: BoolFilter<"Settings"> | boolean
    notifWorkout?: BoolFilter<"Settings"> | boolean
    notifWeight?: BoolFilter<"Settings"> | boolean
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    units?: SortOrder
    waterGoal?: SortOrder
    calorieGoal?: SortOrderInput | SortOrder
    proteinGoal?: SortOrderInput | SortOrder
    carbsGoal?: SortOrderInput | SortOrder
    fatGoal?: SortOrderInput | SortOrder
    notifWater?: SortOrder
    notifMeals?: SortOrder
    notifWorkout?: SortOrder
    notifWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    darkMode?: BoolFilter<"Settings"> | boolean
    units?: StringFilter<"Settings"> | string
    waterGoal?: FloatFilter<"Settings"> | number
    calorieGoal?: FloatNullableFilter<"Settings"> | number | null
    proteinGoal?: FloatNullableFilter<"Settings"> | number | null
    carbsGoal?: FloatNullableFilter<"Settings"> | number | null
    fatGoal?: FloatNullableFilter<"Settings"> | number | null
    notifWater?: BoolFilter<"Settings"> | boolean
    notifMeals?: BoolFilter<"Settings"> | boolean
    notifWorkout?: BoolFilter<"Settings"> | boolean
    notifWeight?: BoolFilter<"Settings"> | boolean
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    units?: SortOrder
    waterGoal?: SortOrder
    calorieGoal?: SortOrderInput | SortOrder
    proteinGoal?: SortOrderInput | SortOrder
    carbsGoal?: SortOrderInput | SortOrder
    fatGoal?: SortOrderInput | SortOrder
    notifWater?: SortOrder
    notifMeals?: SortOrder
    notifWorkout?: SortOrder
    notifWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _avg?: SettingsAvgOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
    _sum?: SettingsSumOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Settings"> | string
    userId?: StringWithAggregatesFilter<"Settings"> | string
    darkMode?: BoolWithAggregatesFilter<"Settings"> | boolean
    units?: StringWithAggregatesFilter<"Settings"> | string
    waterGoal?: FloatWithAggregatesFilter<"Settings"> | number
    calorieGoal?: FloatNullableWithAggregatesFilter<"Settings"> | number | null
    proteinGoal?: FloatNullableWithAggregatesFilter<"Settings"> | number | null
    carbsGoal?: FloatNullableWithAggregatesFilter<"Settings"> | number | null
    fatGoal?: FloatNullableWithAggregatesFilter<"Settings"> | number | null
    notifWater?: BoolWithAggregatesFilter<"Settings"> | boolean
    notifMeals?: BoolWithAggregatesFilter<"Settings"> | boolean
    notifWorkout?: BoolWithAggregatesFilter<"Settings"> | boolean
    notifWeight?: BoolWithAggregatesFilter<"Settings"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type FoodWhereInput = {
    AND?: FoodWhereInput | FoodWhereInput[]
    OR?: FoodWhereInput[]
    NOT?: FoodWhereInput | FoodWhereInput[]
    id?: StringFilter<"Food"> | string
    name?: StringFilter<"Food"> | string
    category?: StringFilter<"Food"> | string
    servingSize?: FloatFilter<"Food"> | number
    servingUnit?: StringFilter<"Food"> | string
    calories?: FloatFilter<"Food"> | number
    protein?: FloatFilter<"Food"> | number
    carbs?: FloatFilter<"Food"> | number
    fat?: FloatFilter<"Food"> | number
    fiber?: FloatFilter<"Food"> | number
    sugar?: FloatFilter<"Food"> | number
    sodium?: FloatFilter<"Food"> | number
    barcode?: StringNullableFilter<"Food"> | string | null
    externalSource?: StringNullableFilter<"Food"> | string | null
    externalId?: StringNullableFilter<"Food"> | string | null
    isVerified?: BoolFilter<"Food"> | boolean
    createdAt?: DateTimeFilter<"Food"> | Date | string
    updatedAt?: DateTimeFilter<"Food"> | Date | string
    foodLogs?: FoodLogListRelationFilter
    recipeIngredients?: RecipeIngredientListRelationFilter
  }

  export type FoodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    barcode?: SortOrderInput | SortOrder
    externalSource?: SortOrderInput | SortOrder
    externalId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    foodLogs?: FoodLogOrderByRelationAggregateInput
    recipeIngredients?: RecipeIngredientOrderByRelationAggregateInput
  }

  export type FoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    barcode?: string
    externalSource_externalId?: FoodExternalSourceExternalIdCompoundUniqueInput
    AND?: FoodWhereInput | FoodWhereInput[]
    OR?: FoodWhereInput[]
    NOT?: FoodWhereInput | FoodWhereInput[]
    name?: StringFilter<"Food"> | string
    category?: StringFilter<"Food"> | string
    servingSize?: FloatFilter<"Food"> | number
    servingUnit?: StringFilter<"Food"> | string
    calories?: FloatFilter<"Food"> | number
    protein?: FloatFilter<"Food"> | number
    carbs?: FloatFilter<"Food"> | number
    fat?: FloatFilter<"Food"> | number
    fiber?: FloatFilter<"Food"> | number
    sugar?: FloatFilter<"Food"> | number
    sodium?: FloatFilter<"Food"> | number
    externalSource?: StringNullableFilter<"Food"> | string | null
    externalId?: StringNullableFilter<"Food"> | string | null
    isVerified?: BoolFilter<"Food"> | boolean
    createdAt?: DateTimeFilter<"Food"> | Date | string
    updatedAt?: DateTimeFilter<"Food"> | Date | string
    foodLogs?: FoodLogListRelationFilter
    recipeIngredients?: RecipeIngredientListRelationFilter
  }, "id" | "barcode" | "externalSource_externalId">

  export type FoodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    barcode?: SortOrderInput | SortOrder
    externalSource?: SortOrderInput | SortOrder
    externalId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FoodCountOrderByAggregateInput
    _avg?: FoodAvgOrderByAggregateInput
    _max?: FoodMaxOrderByAggregateInput
    _min?: FoodMinOrderByAggregateInput
    _sum?: FoodSumOrderByAggregateInput
  }

  export type FoodScalarWhereWithAggregatesInput = {
    AND?: FoodScalarWhereWithAggregatesInput | FoodScalarWhereWithAggregatesInput[]
    OR?: FoodScalarWhereWithAggregatesInput[]
    NOT?: FoodScalarWhereWithAggregatesInput | FoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Food"> | string
    name?: StringWithAggregatesFilter<"Food"> | string
    category?: StringWithAggregatesFilter<"Food"> | string
    servingSize?: FloatWithAggregatesFilter<"Food"> | number
    servingUnit?: StringWithAggregatesFilter<"Food"> | string
    calories?: FloatWithAggregatesFilter<"Food"> | number
    protein?: FloatWithAggregatesFilter<"Food"> | number
    carbs?: FloatWithAggregatesFilter<"Food"> | number
    fat?: FloatWithAggregatesFilter<"Food"> | number
    fiber?: FloatWithAggregatesFilter<"Food"> | number
    sugar?: FloatWithAggregatesFilter<"Food"> | number
    sodium?: FloatWithAggregatesFilter<"Food"> | number
    barcode?: StringNullableWithAggregatesFilter<"Food"> | string | null
    externalSource?: StringNullableWithAggregatesFilter<"Food"> | string | null
    externalId?: StringNullableWithAggregatesFilter<"Food"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Food"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Food"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Food"> | Date | string
  }

  export type CustomFoodWhereInput = {
    AND?: CustomFoodWhereInput | CustomFoodWhereInput[]
    OR?: CustomFoodWhereInput[]
    NOT?: CustomFoodWhereInput | CustomFoodWhereInput[]
    id?: StringFilter<"CustomFood"> | string
    userId?: StringFilter<"CustomFood"> | string
    name?: StringFilter<"CustomFood"> | string
    category?: StringFilter<"CustomFood"> | string
    servingSize?: FloatFilter<"CustomFood"> | number
    servingUnit?: StringFilter<"CustomFood"> | string
    calories?: FloatFilter<"CustomFood"> | number
    protein?: FloatFilter<"CustomFood"> | number
    carbs?: FloatFilter<"CustomFood"> | number
    fat?: FloatFilter<"CustomFood"> | number
    fiber?: FloatFilter<"CustomFood"> | number
    sugar?: FloatFilter<"CustomFood"> | number
    sodium?: FloatFilter<"CustomFood"> | number
    createdAt?: DateTimeFilter<"CustomFood"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFood"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    foodLogs?: FoodLogListRelationFilter
    recipeIngredients?: RecipeIngredientListRelationFilter
  }

  export type CustomFoodOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    foodLogs?: FoodLogOrderByRelationAggregateInput
    recipeIngredients?: RecipeIngredientOrderByRelationAggregateInput
  }

  export type CustomFoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomFoodWhereInput | CustomFoodWhereInput[]
    OR?: CustomFoodWhereInput[]
    NOT?: CustomFoodWhereInput | CustomFoodWhereInput[]
    userId?: StringFilter<"CustomFood"> | string
    name?: StringFilter<"CustomFood"> | string
    category?: StringFilter<"CustomFood"> | string
    servingSize?: FloatFilter<"CustomFood"> | number
    servingUnit?: StringFilter<"CustomFood"> | string
    calories?: FloatFilter<"CustomFood"> | number
    protein?: FloatFilter<"CustomFood"> | number
    carbs?: FloatFilter<"CustomFood"> | number
    fat?: FloatFilter<"CustomFood"> | number
    fiber?: FloatFilter<"CustomFood"> | number
    sugar?: FloatFilter<"CustomFood"> | number
    sodium?: FloatFilter<"CustomFood"> | number
    createdAt?: DateTimeFilter<"CustomFood"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFood"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    foodLogs?: FoodLogListRelationFilter
    recipeIngredients?: RecipeIngredientListRelationFilter
  }, "id">

  export type CustomFoodOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomFoodCountOrderByAggregateInput
    _avg?: CustomFoodAvgOrderByAggregateInput
    _max?: CustomFoodMaxOrderByAggregateInput
    _min?: CustomFoodMinOrderByAggregateInput
    _sum?: CustomFoodSumOrderByAggregateInput
  }

  export type CustomFoodScalarWhereWithAggregatesInput = {
    AND?: CustomFoodScalarWhereWithAggregatesInput | CustomFoodScalarWhereWithAggregatesInput[]
    OR?: CustomFoodScalarWhereWithAggregatesInput[]
    NOT?: CustomFoodScalarWhereWithAggregatesInput | CustomFoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomFood"> | string
    userId?: StringWithAggregatesFilter<"CustomFood"> | string
    name?: StringWithAggregatesFilter<"CustomFood"> | string
    category?: StringWithAggregatesFilter<"CustomFood"> | string
    servingSize?: FloatWithAggregatesFilter<"CustomFood"> | number
    servingUnit?: StringWithAggregatesFilter<"CustomFood"> | string
    calories?: FloatWithAggregatesFilter<"CustomFood"> | number
    protein?: FloatWithAggregatesFilter<"CustomFood"> | number
    carbs?: FloatWithAggregatesFilter<"CustomFood"> | number
    fat?: FloatWithAggregatesFilter<"CustomFood"> | number
    fiber?: FloatWithAggregatesFilter<"CustomFood"> | number
    sugar?: FloatWithAggregatesFilter<"CustomFood"> | number
    sodium?: FloatWithAggregatesFilter<"CustomFood"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CustomFood"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomFood"> | Date | string
  }

  export type RecipeWhereInput = {
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    id?: StringFilter<"Recipe"> | string
    userId?: StringFilter<"Recipe"> | string
    name?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    servings?: FloatFilter<"Recipe"> | number
    servingSize?: FloatFilter<"Recipe"> | number
    servingUnit?: StringFilter<"Recipe"> | string
    calories?: FloatFilter<"Recipe"> | number
    protein?: FloatFilter<"Recipe"> | number
    carbs?: FloatFilter<"Recipe"> | number
    fat?: FloatFilter<"Recipe"> | number
    fiber?: FloatFilter<"Recipe"> | number
    sugar?: FloatFilter<"Recipe"> | number
    sodium?: FloatFilter<"Recipe"> | number
    totalWeight?: FloatFilter<"Recipe"> | number
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    ingredients?: RecipeIngredientListRelationFilter
    foodLogs?: FoodLogListRelationFilter
  }

  export type RecipeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    servings?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    ingredients?: RecipeIngredientOrderByRelationAggregateInput
    foodLogs?: FoodLogOrderByRelationAggregateInput
  }

  export type RecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    userId?: StringFilter<"Recipe"> | string
    name?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    servings?: FloatFilter<"Recipe"> | number
    servingSize?: FloatFilter<"Recipe"> | number
    servingUnit?: StringFilter<"Recipe"> | string
    calories?: FloatFilter<"Recipe"> | number
    protein?: FloatFilter<"Recipe"> | number
    carbs?: FloatFilter<"Recipe"> | number
    fat?: FloatFilter<"Recipe"> | number
    fiber?: FloatFilter<"Recipe"> | number
    sugar?: FloatFilter<"Recipe"> | number
    sodium?: FloatFilter<"Recipe"> | number
    totalWeight?: FloatFilter<"Recipe"> | number
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    ingredients?: RecipeIngredientListRelationFilter
    foodLogs?: FoodLogListRelationFilter
  }, "id">

  export type RecipeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    servings?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecipeCountOrderByAggregateInput
    _avg?: RecipeAvgOrderByAggregateInput
    _max?: RecipeMaxOrderByAggregateInput
    _min?: RecipeMinOrderByAggregateInput
    _sum?: RecipeSumOrderByAggregateInput
  }

  export type RecipeScalarWhereWithAggregatesInput = {
    AND?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    OR?: RecipeScalarWhereWithAggregatesInput[]
    NOT?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recipe"> | string
    userId?: StringWithAggregatesFilter<"Recipe"> | string
    name?: StringWithAggregatesFilter<"Recipe"> | string
    description?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    servings?: FloatWithAggregatesFilter<"Recipe"> | number
    servingSize?: FloatWithAggregatesFilter<"Recipe"> | number
    servingUnit?: StringWithAggregatesFilter<"Recipe"> | string
    calories?: FloatWithAggregatesFilter<"Recipe"> | number
    protein?: FloatWithAggregatesFilter<"Recipe"> | number
    carbs?: FloatWithAggregatesFilter<"Recipe"> | number
    fat?: FloatWithAggregatesFilter<"Recipe"> | number
    fiber?: FloatWithAggregatesFilter<"Recipe"> | number
    sugar?: FloatWithAggregatesFilter<"Recipe"> | number
    sodium?: FloatWithAggregatesFilter<"Recipe"> | number
    totalWeight?: FloatWithAggregatesFilter<"Recipe"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
  }

  export type RecipeIngredientWhereInput = {
    AND?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    OR?: RecipeIngredientWhereInput[]
    NOT?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    id?: StringFilter<"RecipeIngredient"> | string
    recipeId?: StringFilter<"RecipeIngredient"> | string
    name?: StringFilter<"RecipeIngredient"> | string
    foodId?: StringNullableFilter<"RecipeIngredient"> | string | null
    customFoodId?: StringNullableFilter<"RecipeIngredient"> | string | null
    amount?: FloatFilter<"RecipeIngredient"> | number
    calories?: FloatFilter<"RecipeIngredient"> | number
    protein?: FloatFilter<"RecipeIngredient"> | number
    carbs?: FloatFilter<"RecipeIngredient"> | number
    fat?: FloatFilter<"RecipeIngredient"> | number
    fiber?: FloatFilter<"RecipeIngredient"> | number
    sortOrder?: IntFilter<"RecipeIngredient"> | number
    recipe?: XOR<RecipeRelationFilter, RecipeWhereInput>
    food?: XOR<FoodNullableRelationFilter, FoodWhereInput> | null
    customFood?: XOR<CustomFoodNullableRelationFilter, CustomFoodWhereInput> | null
  }

  export type RecipeIngredientOrderByWithRelationInput = {
    id?: SortOrder
    recipeId?: SortOrder
    name?: SortOrder
    foodId?: SortOrderInput | SortOrder
    customFoodId?: SortOrderInput | SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
    recipe?: RecipeOrderByWithRelationInput
    food?: FoodOrderByWithRelationInput
    customFood?: CustomFoodOrderByWithRelationInput
  }

  export type RecipeIngredientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    OR?: RecipeIngredientWhereInput[]
    NOT?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    recipeId?: StringFilter<"RecipeIngredient"> | string
    name?: StringFilter<"RecipeIngredient"> | string
    foodId?: StringNullableFilter<"RecipeIngredient"> | string | null
    customFoodId?: StringNullableFilter<"RecipeIngredient"> | string | null
    amount?: FloatFilter<"RecipeIngredient"> | number
    calories?: FloatFilter<"RecipeIngredient"> | number
    protein?: FloatFilter<"RecipeIngredient"> | number
    carbs?: FloatFilter<"RecipeIngredient"> | number
    fat?: FloatFilter<"RecipeIngredient"> | number
    fiber?: FloatFilter<"RecipeIngredient"> | number
    sortOrder?: IntFilter<"RecipeIngredient"> | number
    recipe?: XOR<RecipeRelationFilter, RecipeWhereInput>
    food?: XOR<FoodNullableRelationFilter, FoodWhereInput> | null
    customFood?: XOR<CustomFoodNullableRelationFilter, CustomFoodWhereInput> | null
  }, "id">

  export type RecipeIngredientOrderByWithAggregationInput = {
    id?: SortOrder
    recipeId?: SortOrder
    name?: SortOrder
    foodId?: SortOrderInput | SortOrder
    customFoodId?: SortOrderInput | SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
    _count?: RecipeIngredientCountOrderByAggregateInput
    _avg?: RecipeIngredientAvgOrderByAggregateInput
    _max?: RecipeIngredientMaxOrderByAggregateInput
    _min?: RecipeIngredientMinOrderByAggregateInput
    _sum?: RecipeIngredientSumOrderByAggregateInput
  }

  export type RecipeIngredientScalarWhereWithAggregatesInput = {
    AND?: RecipeIngredientScalarWhereWithAggregatesInput | RecipeIngredientScalarWhereWithAggregatesInput[]
    OR?: RecipeIngredientScalarWhereWithAggregatesInput[]
    NOT?: RecipeIngredientScalarWhereWithAggregatesInput | RecipeIngredientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    recipeId?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    name?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    foodId?: StringNullableWithAggregatesFilter<"RecipeIngredient"> | string | null
    customFoodId?: StringNullableWithAggregatesFilter<"RecipeIngredient"> | string | null
    amount?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    calories?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    protein?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    carbs?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    fat?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    fiber?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    sortOrder?: IntWithAggregatesFilter<"RecipeIngredient"> | number
  }

  export type FoodLogWhereInput = {
    AND?: FoodLogWhereInput | FoodLogWhereInput[]
    OR?: FoodLogWhereInput[]
    NOT?: FoodLogWhereInput | FoodLogWhereInput[]
    id?: StringFilter<"FoodLog"> | string
    userId?: StringFilter<"FoodLog"> | string
    foodId?: StringNullableFilter<"FoodLog"> | string | null
    customFoodId?: StringNullableFilter<"FoodLog"> | string | null
    recipeId?: StringNullableFilter<"FoodLog"> | string | null
    mealType?: StringFilter<"FoodLog"> | string
    amount?: FloatFilter<"FoodLog"> | number
    calories?: FloatFilter<"FoodLog"> | number
    protein?: FloatFilter<"FoodLog"> | number
    carbs?: FloatFilter<"FoodLog"> | number
    fat?: FloatFilter<"FoodLog"> | number
    fiber?: FloatFilter<"FoodLog"> | number
    logDate?: DateTimeFilter<"FoodLog"> | Date | string
    createdAt?: DateTimeFilter<"FoodLog"> | Date | string
    updatedAt?: DateTimeFilter<"FoodLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    food?: XOR<FoodNullableRelationFilter, FoodWhereInput> | null
    customFood?: XOR<CustomFoodNullableRelationFilter, CustomFoodWhereInput> | null
    recipe?: XOR<RecipeNullableRelationFilter, RecipeWhereInput> | null
  }

  export type FoodLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    foodId?: SortOrderInput | SortOrder
    customFoodId?: SortOrderInput | SortOrder
    recipeId?: SortOrderInput | SortOrder
    mealType?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    food?: FoodOrderByWithRelationInput
    customFood?: CustomFoodOrderByWithRelationInput
    recipe?: RecipeOrderByWithRelationInput
  }

  export type FoodLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FoodLogWhereInput | FoodLogWhereInput[]
    OR?: FoodLogWhereInput[]
    NOT?: FoodLogWhereInput | FoodLogWhereInput[]
    userId?: StringFilter<"FoodLog"> | string
    foodId?: StringNullableFilter<"FoodLog"> | string | null
    customFoodId?: StringNullableFilter<"FoodLog"> | string | null
    recipeId?: StringNullableFilter<"FoodLog"> | string | null
    mealType?: StringFilter<"FoodLog"> | string
    amount?: FloatFilter<"FoodLog"> | number
    calories?: FloatFilter<"FoodLog"> | number
    protein?: FloatFilter<"FoodLog"> | number
    carbs?: FloatFilter<"FoodLog"> | number
    fat?: FloatFilter<"FoodLog"> | number
    fiber?: FloatFilter<"FoodLog"> | number
    logDate?: DateTimeFilter<"FoodLog"> | Date | string
    createdAt?: DateTimeFilter<"FoodLog"> | Date | string
    updatedAt?: DateTimeFilter<"FoodLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    food?: XOR<FoodNullableRelationFilter, FoodWhereInput> | null
    customFood?: XOR<CustomFoodNullableRelationFilter, CustomFoodWhereInput> | null
    recipe?: XOR<RecipeNullableRelationFilter, RecipeWhereInput> | null
  }, "id">

  export type FoodLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    foodId?: SortOrderInput | SortOrder
    customFoodId?: SortOrderInput | SortOrder
    recipeId?: SortOrderInput | SortOrder
    mealType?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FoodLogCountOrderByAggregateInput
    _avg?: FoodLogAvgOrderByAggregateInput
    _max?: FoodLogMaxOrderByAggregateInput
    _min?: FoodLogMinOrderByAggregateInput
    _sum?: FoodLogSumOrderByAggregateInput
  }

  export type FoodLogScalarWhereWithAggregatesInput = {
    AND?: FoodLogScalarWhereWithAggregatesInput | FoodLogScalarWhereWithAggregatesInput[]
    OR?: FoodLogScalarWhereWithAggregatesInput[]
    NOT?: FoodLogScalarWhereWithAggregatesInput | FoodLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FoodLog"> | string
    userId?: StringWithAggregatesFilter<"FoodLog"> | string
    foodId?: StringNullableWithAggregatesFilter<"FoodLog"> | string | null
    customFoodId?: StringNullableWithAggregatesFilter<"FoodLog"> | string | null
    recipeId?: StringNullableWithAggregatesFilter<"FoodLog"> | string | null
    mealType?: StringWithAggregatesFilter<"FoodLog"> | string
    amount?: FloatWithAggregatesFilter<"FoodLog"> | number
    calories?: FloatWithAggregatesFilter<"FoodLog"> | number
    protein?: FloatWithAggregatesFilter<"FoodLog"> | number
    carbs?: FloatWithAggregatesFilter<"FoodLog"> | number
    fat?: FloatWithAggregatesFilter<"FoodLog"> | number
    fiber?: FloatWithAggregatesFilter<"FoodLog"> | number
    logDate?: DateTimeWithAggregatesFilter<"FoodLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"FoodLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FoodLog"> | Date | string
  }

  export type WaterLogWhereInput = {
    AND?: WaterLogWhereInput | WaterLogWhereInput[]
    OR?: WaterLogWhereInput[]
    NOT?: WaterLogWhereInput | WaterLogWhereInput[]
    id?: StringFilter<"WaterLog"> | string
    userId?: StringFilter<"WaterLog"> | string
    amount?: FloatFilter<"WaterLog"> | number
    logDate?: DateTimeFilter<"WaterLog"> | Date | string
    createdAt?: DateTimeFilter<"WaterLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type WaterLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WaterLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WaterLogWhereInput | WaterLogWhereInput[]
    OR?: WaterLogWhereInput[]
    NOT?: WaterLogWhereInput | WaterLogWhereInput[]
    userId?: StringFilter<"WaterLog"> | string
    amount?: FloatFilter<"WaterLog"> | number
    logDate?: DateTimeFilter<"WaterLog"> | Date | string
    createdAt?: DateTimeFilter<"WaterLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type WaterLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    _count?: WaterLogCountOrderByAggregateInput
    _avg?: WaterLogAvgOrderByAggregateInput
    _max?: WaterLogMaxOrderByAggregateInput
    _min?: WaterLogMinOrderByAggregateInput
    _sum?: WaterLogSumOrderByAggregateInput
  }

  export type WaterLogScalarWhereWithAggregatesInput = {
    AND?: WaterLogScalarWhereWithAggregatesInput | WaterLogScalarWhereWithAggregatesInput[]
    OR?: WaterLogScalarWhereWithAggregatesInput[]
    NOT?: WaterLogScalarWhereWithAggregatesInput | WaterLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WaterLog"> | string
    userId?: StringWithAggregatesFilter<"WaterLog"> | string
    amount?: FloatWithAggregatesFilter<"WaterLog"> | number
    logDate?: DateTimeWithAggregatesFilter<"WaterLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WaterLog"> | Date | string
  }

  export type WeightLogWhereInput = {
    AND?: WeightLogWhereInput | WeightLogWhereInput[]
    OR?: WeightLogWhereInput[]
    NOT?: WeightLogWhereInput | WeightLogWhereInput[]
    id?: StringFilter<"WeightLog"> | string
    userId?: StringFilter<"WeightLog"> | string
    weight?: FloatFilter<"WeightLog"> | number
    note?: StringNullableFilter<"WeightLog"> | string | null
    logDate?: DateTimeFilter<"WeightLog"> | Date | string
    createdAt?: DateTimeFilter<"WeightLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type WeightLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    note?: SortOrderInput | SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WeightLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeightLogWhereInput | WeightLogWhereInput[]
    OR?: WeightLogWhereInput[]
    NOT?: WeightLogWhereInput | WeightLogWhereInput[]
    userId?: StringFilter<"WeightLog"> | string
    weight?: FloatFilter<"WeightLog"> | number
    note?: StringNullableFilter<"WeightLog"> | string | null
    logDate?: DateTimeFilter<"WeightLog"> | Date | string
    createdAt?: DateTimeFilter<"WeightLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type WeightLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    note?: SortOrderInput | SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    _count?: WeightLogCountOrderByAggregateInput
    _avg?: WeightLogAvgOrderByAggregateInput
    _max?: WeightLogMaxOrderByAggregateInput
    _min?: WeightLogMinOrderByAggregateInput
    _sum?: WeightLogSumOrderByAggregateInput
  }

  export type WeightLogScalarWhereWithAggregatesInput = {
    AND?: WeightLogScalarWhereWithAggregatesInput | WeightLogScalarWhereWithAggregatesInput[]
    OR?: WeightLogScalarWhereWithAggregatesInput[]
    NOT?: WeightLogScalarWhereWithAggregatesInput | WeightLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeightLog"> | string
    userId?: StringWithAggregatesFilter<"WeightLog"> | string
    weight?: FloatWithAggregatesFilter<"WeightLog"> | number
    note?: StringNullableWithAggregatesFilter<"WeightLog"> | string | null
    logDate?: DateTimeWithAggregatesFilter<"WeightLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WeightLog"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    userId?: StringFilter<"ActivityLog"> | string
    activityType?: StringFilter<"ActivityLog"> | string
    name?: StringFilter<"ActivityLog"> | string
    duration?: FloatFilter<"ActivityLog"> | number
    caloriesBurned?: FloatFilter<"ActivityLog"> | number
    notes?: StringNullableFilter<"ActivityLog"> | string | null
    sets?: IntNullableFilter<"ActivityLog"> | number | null
    reps?: IntNullableFilter<"ActivityLog"> | number | null
    weightUsed?: FloatNullableFilter<"ActivityLog"> | number | null
    muscleGroup?: StringNullableFilter<"ActivityLog"> | string | null
    startWeight?: FloatNullableFilter<"ActivityLog"> | number | null
    startReps?: IntNullableFilter<"ActivityLog"> | number | null
    endWeight?: FloatNullableFilter<"ActivityLog"> | number | null
    endReps?: IntNullableFilter<"ActivityLog"> | number | null
    totalVolume?: FloatNullableFilter<"ActivityLog"> | number | null
    distance?: FloatNullableFilter<"ActivityLog"> | number | null
    speed?: FloatNullableFilter<"ActivityLog"> | number | null
    pace?: FloatNullableFilter<"ActivityLog"> | number | null
    stroke?: StringNullableFilter<"ActivityLog"> | string | null
    logDate?: DateTimeFilter<"ActivityLog"> | Date | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    activityType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    caloriesBurned?: SortOrder
    notes?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    weightUsed?: SortOrderInput | SortOrder
    muscleGroup?: SortOrderInput | SortOrder
    startWeight?: SortOrderInput | SortOrder
    startReps?: SortOrderInput | SortOrder
    endWeight?: SortOrderInput | SortOrder
    endReps?: SortOrderInput | SortOrder
    totalVolume?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    speed?: SortOrderInput | SortOrder
    pace?: SortOrderInput | SortOrder
    stroke?: SortOrderInput | SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    userId?: StringFilter<"ActivityLog"> | string
    activityType?: StringFilter<"ActivityLog"> | string
    name?: StringFilter<"ActivityLog"> | string
    duration?: FloatFilter<"ActivityLog"> | number
    caloriesBurned?: FloatFilter<"ActivityLog"> | number
    notes?: StringNullableFilter<"ActivityLog"> | string | null
    sets?: IntNullableFilter<"ActivityLog"> | number | null
    reps?: IntNullableFilter<"ActivityLog"> | number | null
    weightUsed?: FloatNullableFilter<"ActivityLog"> | number | null
    muscleGroup?: StringNullableFilter<"ActivityLog"> | string | null
    startWeight?: FloatNullableFilter<"ActivityLog"> | number | null
    startReps?: IntNullableFilter<"ActivityLog"> | number | null
    endWeight?: FloatNullableFilter<"ActivityLog"> | number | null
    endReps?: IntNullableFilter<"ActivityLog"> | number | null
    totalVolume?: FloatNullableFilter<"ActivityLog"> | number | null
    distance?: FloatNullableFilter<"ActivityLog"> | number | null
    speed?: FloatNullableFilter<"ActivityLog"> | number | null
    pace?: FloatNullableFilter<"ActivityLog"> | number | null
    stroke?: StringNullableFilter<"ActivityLog"> | string | null
    logDate?: DateTimeFilter<"ActivityLog"> | Date | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    activityType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    caloriesBurned?: SortOrder
    notes?: SortOrderInput | SortOrder
    sets?: SortOrderInput | SortOrder
    reps?: SortOrderInput | SortOrder
    weightUsed?: SortOrderInput | SortOrder
    muscleGroup?: SortOrderInput | SortOrder
    startWeight?: SortOrderInput | SortOrder
    startReps?: SortOrderInput | SortOrder
    endWeight?: SortOrderInput | SortOrder
    endReps?: SortOrderInput | SortOrder
    totalVolume?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    speed?: SortOrderInput | SortOrder
    pace?: SortOrderInput | SortOrder
    stroke?: SortOrderInput | SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _avg?: ActivityLogAvgOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
    _sum?: ActivityLogSumOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    userId?: StringWithAggregatesFilter<"ActivityLog"> | string
    activityType?: StringWithAggregatesFilter<"ActivityLog"> | string
    name?: StringWithAggregatesFilter<"ActivityLog"> | string
    duration?: FloatWithAggregatesFilter<"ActivityLog"> | number
    caloriesBurned?: FloatWithAggregatesFilter<"ActivityLog"> | number
    notes?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    sets?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    reps?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    weightUsed?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    muscleGroup?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    startWeight?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    startReps?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    endWeight?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    endReps?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    totalVolume?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    distance?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    speed?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    pace?: FloatNullableWithAggregatesFilter<"ActivityLog"> | number | null
    stroke?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    logDate?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateInput = {
    id?: string
    darkMode?: boolean
    units?: string
    waterGoal?: number
    calorieGoal?: number | null
    proteinGoal?: number | null
    carbsGoal?: number | null
    fatGoal?: number | null
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSettingsInput
  }

  export type SettingsUncheckedCreateInput = {
    id?: string
    userId: string
    darkMode?: boolean
    units?: string
    waterGoal?: number
    calorieGoal?: number | null
    proteinGoal?: number | null
    carbsGoal?: number | null
    fatGoal?: number | null
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    units?: StringFieldUpdateOperationsInput | string
    waterGoal?: FloatFieldUpdateOperationsInput | number
    calorieGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    proteinGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    fatGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    notifWater?: BoolFieldUpdateOperationsInput | boolean
    notifMeals?: BoolFieldUpdateOperationsInput | boolean
    notifWorkout?: BoolFieldUpdateOperationsInput | boolean
    notifWeight?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type SettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    units?: StringFieldUpdateOperationsInput | string
    waterGoal?: FloatFieldUpdateOperationsInput | number
    calorieGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    proteinGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    fatGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    notifWater?: BoolFieldUpdateOperationsInput | boolean
    notifMeals?: BoolFieldUpdateOperationsInput | boolean
    notifWorkout?: BoolFieldUpdateOperationsInput | boolean
    notifWeight?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateManyInput = {
    id?: string
    userId: string
    darkMode?: boolean
    units?: string
    waterGoal?: number
    calorieGoal?: number | null
    proteinGoal?: number | null
    carbsGoal?: number | null
    fatGoal?: number | null
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    units?: StringFieldUpdateOperationsInput | string
    waterGoal?: FloatFieldUpdateOperationsInput | number
    calorieGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    proteinGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    fatGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    notifWater?: BoolFieldUpdateOperationsInput | boolean
    notifMeals?: BoolFieldUpdateOperationsInput | boolean
    notifWorkout?: BoolFieldUpdateOperationsInput | boolean
    notifWeight?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    units?: StringFieldUpdateOperationsInput | string
    waterGoal?: FloatFieldUpdateOperationsInput | number
    calorieGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    proteinGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    fatGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    notifWater?: BoolFieldUpdateOperationsInput | boolean
    notifMeals?: BoolFieldUpdateOperationsInput | boolean
    notifWorkout?: BoolFieldUpdateOperationsInput | boolean
    notifWeight?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodCreateInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogCreateNestedManyWithoutFoodInput
    recipeIngredients?: RecipeIngredientCreateNestedManyWithoutFoodInput
  }

  export type FoodUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutFoodInput
    recipeIngredients?: RecipeIngredientUncheckedCreateNestedManyWithoutFoodInput
  }

  export type FoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUpdateManyWithoutFoodNestedInput
    recipeIngredients?: RecipeIngredientUpdateManyWithoutFoodNestedInput
  }

  export type FoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutFoodNestedInput
    recipeIngredients?: RecipeIngredientUncheckedUpdateManyWithoutFoodNestedInput
  }

  export type FoodCreateManyInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFoodCreateInput = {
    id?: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCustomFoodsInput
    foodLogs?: FoodLogCreateNestedManyWithoutCustomFoodInput
    recipeIngredients?: RecipeIngredientCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutCustomFoodInput
    recipeIngredients?: RecipeIngredientUncheckedCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomFoodsNestedInput
    foodLogs?: FoodLogUpdateManyWithoutCustomFoodNestedInput
    recipeIngredients?: RecipeIngredientUpdateManyWithoutCustomFoodNestedInput
  }

  export type CustomFoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutCustomFoodNestedInput
    recipeIngredients?: RecipeIngredientUncheckedUpdateManyWithoutCustomFoodNestedInput
  }

  export type CustomFoodCreateManyInput = {
    id?: string
    userId: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCreateInput = {
    id?: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRecipesInput
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
    foodLogs?: FoodLogCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
    foodLogs?: FoodLogUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeIngredientCreateInput = {
    id?: string
    name: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
    recipe: RecipeCreateNestedOneWithoutIngredientsInput
    food?: FoodCreateNestedOneWithoutRecipeIngredientsInput
    customFood?: CustomFoodCreateNestedOneWithoutRecipeIngredientsInput
  }

  export type RecipeIngredientUncheckedCreateInput = {
    id?: string
    recipeId: string
    name: string
    foodId?: string | null
    customFoodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type RecipeIngredientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    recipe?: RecipeUpdateOneRequiredWithoutIngredientsNestedInput
    food?: FoodUpdateOneWithoutRecipeIngredientsNestedInput
    customFood?: CustomFoodUpdateOneWithoutRecipeIngredientsNestedInput
  }

  export type RecipeIngredientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RecipeIngredientCreateManyInput = {
    id?: string
    recipeId: string
    name: string
    foodId?: string | null
    customFoodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type RecipeIngredientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RecipeIngredientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type FoodLogCreateInput = {
    id?: string
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFoodLogsInput
    food?: FoodCreateNestedOneWithoutFoodLogsInput
    customFood?: CustomFoodCreateNestedOneWithoutFoodLogsInput
    recipe?: RecipeCreateNestedOneWithoutFoodLogsInput
  }

  export type FoodLogUncheckedCreateInput = {
    id?: string
    userId: string
    foodId?: string | null
    customFoodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFoodLogsNestedInput
    food?: FoodUpdateOneWithoutFoodLogsNestedInput
    customFood?: CustomFoodUpdateOneWithoutFoodLogsNestedInput
    recipe?: RecipeUpdateOneWithoutFoodLogsNestedInput
  }

  export type FoodLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogCreateManyInput = {
    id?: string
    userId: string
    foodId?: string | null
    customFoodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogCreateInput = {
    id?: string
    amount: number
    logDate?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWaterLogsInput
  }

  export type WaterLogUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WaterLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWaterLogsNestedInput
  }

  export type WaterLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogCreateManyInput = {
    id?: string
    userId: string
    amount: number
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WaterLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogCreateInput = {
    id?: string
    weight: number
    note?: string | null
    logDate?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWeightLogsInput
  }

  export type WeightLogUncheckedCreateInput = {
    id?: string
    userId: string
    weight: number
    note?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WeightLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWeightLogsNestedInput
  }

  export type WeightLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogCreateManyInput = {
    id?: string
    userId: string
    weight: number
    note?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WeightLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    id?: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes?: string | null
    sets?: number | null
    reps?: number | null
    weightUsed?: number | null
    muscleGroup?: string | null
    startWeight?: number | null
    startReps?: number | null
    endWeight?: number | null
    endReps?: number | null
    totalVolume?: number | null
    distance?: number | null
    speed?: number | null
    pace?: number | null
    stroke?: string | null
    logDate?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    userId: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes?: string | null
    sets?: number | null
    reps?: number | null
    weightUsed?: number | null
    muscleGroup?: string | null
    startWeight?: number | null
    startReps?: number | null
    endWeight?: number | null
    endReps?: number | null
    totalVolume?: number | null
    distance?: number | null
    speed?: number | null
    pace?: number | null
    stroke?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    userId: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes?: string | null
    sets?: number | null
    reps?: number | null
    weightUsed?: number | null
    muscleGroup?: string | null
    startWeight?: number | null
    startReps?: number | null
    endWeight?: number | null
    endReps?: number | null
    totalVolume?: number | null
    distance?: number | null
    speed?: number | null
    pace?: number | null
    stroke?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SettingsNullableRelationFilter = {
    is?: SettingsWhereInput | null
    isNot?: SettingsWhereInput | null
  }

  export type FoodLogListRelationFilter = {
    every?: FoodLogWhereInput
    some?: FoodLogWhereInput
    none?: FoodLogWhereInput
  }

  export type WaterLogListRelationFilter = {
    every?: WaterLogWhereInput
    some?: WaterLogWhereInput
    none?: WaterLogWhereInput
  }

  export type WeightLogListRelationFilter = {
    every?: WeightLogWhereInput
    some?: WeightLogWhereInput
    none?: WeightLogWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type CustomFoodListRelationFilter = {
    every?: CustomFoodWhereInput
    some?: CustomFoodWhereInput
    none?: CustomFoodWhereInput
  }

  export type RecipeListRelationFilter = {
    every?: RecipeWhereInput
    some?: RecipeWhereInput
    none?: RecipeWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FoodLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WaterLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeightLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomFoodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    height?: SortOrder
    currentWeight?: SortOrder
    goalWeight?: SortOrder
    activityLevel?: SortOrder
    gymDaysPerWeek?: SortOrder
    dailyWalkKm?: SortOrder
    gymMinutesPerSession?: SortOrder
    goal?: SortOrder
    goalDate?: SortOrder
    profileCompleted?: SortOrder
    isAdmin?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    age?: SortOrder
    height?: SortOrder
    currentWeight?: SortOrder
    goalWeight?: SortOrder
    gymDaysPerWeek?: SortOrder
    dailyWalkKm?: SortOrder
    gymMinutesPerSession?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    height?: SortOrder
    currentWeight?: SortOrder
    goalWeight?: SortOrder
    activityLevel?: SortOrder
    gymDaysPerWeek?: SortOrder
    dailyWalkKm?: SortOrder
    gymMinutesPerSession?: SortOrder
    goal?: SortOrder
    goalDate?: SortOrder
    profileCompleted?: SortOrder
    isAdmin?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    age?: SortOrder
    sex?: SortOrder
    height?: SortOrder
    currentWeight?: SortOrder
    goalWeight?: SortOrder
    activityLevel?: SortOrder
    gymDaysPerWeek?: SortOrder
    dailyWalkKm?: SortOrder
    gymMinutesPerSession?: SortOrder
    goal?: SortOrder
    goalDate?: SortOrder
    profileCompleted?: SortOrder
    isAdmin?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    age?: SortOrder
    height?: SortOrder
    currentWeight?: SortOrder
    goalWeight?: SortOrder
    gymDaysPerWeek?: SortOrder
    dailyWalkKm?: SortOrder
    gymMinutesPerSession?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    units?: SortOrder
    waterGoal?: SortOrder
    calorieGoal?: SortOrder
    proteinGoal?: SortOrder
    carbsGoal?: SortOrder
    fatGoal?: SortOrder
    notifWater?: SortOrder
    notifMeals?: SortOrder
    notifWorkout?: SortOrder
    notifWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsAvgOrderByAggregateInput = {
    waterGoal?: SortOrder
    calorieGoal?: SortOrder
    proteinGoal?: SortOrder
    carbsGoal?: SortOrder
    fatGoal?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    units?: SortOrder
    waterGoal?: SortOrder
    calorieGoal?: SortOrder
    proteinGoal?: SortOrder
    carbsGoal?: SortOrder
    fatGoal?: SortOrder
    notifWater?: SortOrder
    notifMeals?: SortOrder
    notifWorkout?: SortOrder
    notifWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    units?: SortOrder
    waterGoal?: SortOrder
    calorieGoal?: SortOrder
    proteinGoal?: SortOrder
    carbsGoal?: SortOrder
    fatGoal?: SortOrder
    notifWater?: SortOrder
    notifMeals?: SortOrder
    notifWorkout?: SortOrder
    notifWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsSumOrderByAggregateInput = {
    waterGoal?: SortOrder
    calorieGoal?: SortOrder
    proteinGoal?: SortOrder
    carbsGoal?: SortOrder
    fatGoal?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RecipeIngredientListRelationFilter = {
    every?: RecipeIngredientWhereInput
    some?: RecipeIngredientWhereInput
    none?: RecipeIngredientWhereInput
  }

  export type RecipeIngredientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FoodExternalSourceExternalIdCompoundUniqueInput = {
    externalSource: string
    externalId: string
  }

  export type FoodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    barcode?: SortOrder
    externalSource?: SortOrder
    externalId?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodAvgOrderByAggregateInput = {
    servingSize?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
  }

  export type FoodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    barcode?: SortOrder
    externalSource?: SortOrder
    externalId?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    barcode?: SortOrder
    externalSource?: SortOrder
    externalId?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodSumOrderByAggregateInput = {
    servingSize?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
  }

  export type CustomFoodCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFoodAvgOrderByAggregateInput = {
    servingSize?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
  }

  export type CustomFoodMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFoodMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFoodSumOrderByAggregateInput = {
    servingSize?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
  }

  export type RecipeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    servings?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeAvgOrderByAggregateInput = {
    servings?: SortOrder
    servingSize?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
  }

  export type RecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    servings?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    servings?: SortOrder
    servingSize?: SortOrder
    servingUnit?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeSumOrderByAggregateInput = {
    servings?: SortOrder
    servingSize?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sugar?: SortOrder
    sodium?: SortOrder
    totalWeight?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RecipeRelationFilter = {
    is?: RecipeWhereInput
    isNot?: RecipeWhereInput
  }

  export type FoodNullableRelationFilter = {
    is?: FoodWhereInput | null
    isNot?: FoodWhereInput | null
  }

  export type CustomFoodNullableRelationFilter = {
    is?: CustomFoodWhereInput | null
    isNot?: CustomFoodWhereInput | null
  }

  export type RecipeIngredientCountOrderByAggregateInput = {
    id?: SortOrder
    recipeId?: SortOrder
    name?: SortOrder
    foodId?: SortOrder
    customFoodId?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
  }

  export type RecipeIngredientAvgOrderByAggregateInput = {
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
  }

  export type RecipeIngredientMaxOrderByAggregateInput = {
    id?: SortOrder
    recipeId?: SortOrder
    name?: SortOrder
    foodId?: SortOrder
    customFoodId?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
  }

  export type RecipeIngredientMinOrderByAggregateInput = {
    id?: SortOrder
    recipeId?: SortOrder
    name?: SortOrder
    foodId?: SortOrder
    customFoodId?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
  }

  export type RecipeIngredientSumOrderByAggregateInput = {
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    sortOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RecipeNullableRelationFilter = {
    is?: RecipeWhereInput | null
    isNot?: RecipeWhereInput | null
  }

  export type FoodLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    foodId?: SortOrder
    customFoodId?: SortOrder
    recipeId?: SortOrder
    mealType?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodLogAvgOrderByAggregateInput = {
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
  }

  export type FoodLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    foodId?: SortOrder
    customFoodId?: SortOrder
    recipeId?: SortOrder
    mealType?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    foodId?: SortOrder
    customFoodId?: SortOrder
    recipeId?: SortOrder
    mealType?: SortOrder
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoodLogSumOrderByAggregateInput = {
    amount?: SortOrder
    calories?: SortOrder
    protein?: SortOrder
    carbs?: SortOrder
    fat?: SortOrder
    fiber?: SortOrder
  }

  export type WaterLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type WaterLogAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WaterLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type WaterLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type WaterLogSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WeightLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    note?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type WeightLogAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type WeightLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    note?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type WeightLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    weight?: SortOrder
    note?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type WeightLogSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    activityType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    caloriesBurned?: SortOrder
    notes?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightUsed?: SortOrder
    muscleGroup?: SortOrder
    startWeight?: SortOrder
    startReps?: SortOrder
    endWeight?: SortOrder
    endReps?: SortOrder
    totalVolume?: SortOrder
    distance?: SortOrder
    speed?: SortOrder
    pace?: SortOrder
    stroke?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogAvgOrderByAggregateInput = {
    duration?: SortOrder
    caloriesBurned?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightUsed?: SortOrder
    startWeight?: SortOrder
    startReps?: SortOrder
    endWeight?: SortOrder
    endReps?: SortOrder
    totalVolume?: SortOrder
    distance?: SortOrder
    speed?: SortOrder
    pace?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    activityType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    caloriesBurned?: SortOrder
    notes?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightUsed?: SortOrder
    muscleGroup?: SortOrder
    startWeight?: SortOrder
    startReps?: SortOrder
    endWeight?: SortOrder
    endReps?: SortOrder
    totalVolume?: SortOrder
    distance?: SortOrder
    speed?: SortOrder
    pace?: SortOrder
    stroke?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    activityType?: SortOrder
    name?: SortOrder
    duration?: SortOrder
    caloriesBurned?: SortOrder
    notes?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightUsed?: SortOrder
    muscleGroup?: SortOrder
    startWeight?: SortOrder
    startReps?: SortOrder
    endWeight?: SortOrder
    endReps?: SortOrder
    totalVolume?: SortOrder
    distance?: SortOrder
    speed?: SortOrder
    pace?: SortOrder
    stroke?: SortOrder
    logDate?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogSumOrderByAggregateInput = {
    duration?: SortOrder
    caloriesBurned?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weightUsed?: SortOrder
    startWeight?: SortOrder
    startReps?: SortOrder
    endWeight?: SortOrder
    endReps?: SortOrder
    totalVolume?: SortOrder
    distance?: SortOrder
    speed?: SortOrder
    pace?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type SettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    connect?: SettingsWhereUniqueInput
  }

  export type FoodLogCreateNestedManyWithoutUserInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type WaterLogCreateNestedManyWithoutUserInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
  }

  export type WeightLogCreateNestedManyWithoutUserInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type CustomFoodCreateNestedManyWithoutUserInput = {
    create?: XOR<CustomFoodCreateWithoutUserInput, CustomFoodUncheckedCreateWithoutUserInput> | CustomFoodCreateWithoutUserInput[] | CustomFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomFoodCreateOrConnectWithoutUserInput | CustomFoodCreateOrConnectWithoutUserInput[]
    createMany?: CustomFoodCreateManyUserInputEnvelope
    connect?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
  }

  export type RecipeCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    connect?: SettingsWhereUniqueInput
  }

  export type FoodLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type WaterLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
  }

  export type WeightLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type CustomFoodUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CustomFoodCreateWithoutUserInput, CustomFoodUncheckedCreateWithoutUserInput> | CustomFoodCreateWithoutUserInput[] | CustomFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomFoodCreateOrConnectWithoutUserInput | CustomFoodCreateOrConnectWithoutUserInput[]
    createMany?: CustomFoodCreateManyUserInputEnvelope
    connect?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
  }

  export type RecipeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    upsert?: SettingsUpsertWithoutUserInput
    disconnect?: SettingsWhereInput | boolean
    delete?: SettingsWhereInput | boolean
    connect?: SettingsWhereUniqueInput
    update?: XOR<XOR<SettingsUpdateToOneWithWhereWithoutUserInput, SettingsUpdateWithoutUserInput>, SettingsUncheckedUpdateWithoutUserInput>
  }

  export type FoodLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutUserInput | FoodLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutUserInput | FoodLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutUserInput | FoodLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type WaterLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    upsert?: WaterLogUpsertWithWhereUniqueWithoutUserInput | WaterLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    set?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    disconnect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    delete?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    update?: WaterLogUpdateWithWhereUniqueWithoutUserInput | WaterLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WaterLogUpdateManyWithWhereWithoutUserInput | WaterLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
  }

  export type WeightLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    upsert?: WeightLogUpsertWithWhereUniqueWithoutUserInput | WeightLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    set?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    disconnect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    delete?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    update?: WeightLogUpdateWithWhereUniqueWithoutUserInput | WeightLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeightLogUpdateManyWithWhereWithoutUserInput | WeightLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type CustomFoodUpdateManyWithoutUserNestedInput = {
    create?: XOR<CustomFoodCreateWithoutUserInput, CustomFoodUncheckedCreateWithoutUserInput> | CustomFoodCreateWithoutUserInput[] | CustomFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomFoodCreateOrConnectWithoutUserInput | CustomFoodCreateOrConnectWithoutUserInput[]
    upsert?: CustomFoodUpsertWithWhereUniqueWithoutUserInput | CustomFoodUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CustomFoodCreateManyUserInputEnvelope
    set?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    disconnect?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    delete?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    connect?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    update?: CustomFoodUpdateWithWhereUniqueWithoutUserInput | CustomFoodUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CustomFoodUpdateManyWithWhereWithoutUserInput | CustomFoodUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CustomFoodScalarWhereInput | CustomFoodScalarWhereInput[]
  }

  export type RecipeUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutUserInput | RecipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutUserInput | RecipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutUserInput | RecipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: SettingsCreateOrConnectWithoutUserInput
    upsert?: SettingsUpsertWithoutUserInput
    disconnect?: SettingsWhereInput | boolean
    delete?: SettingsWhereInput | boolean
    connect?: SettingsWhereUniqueInput
    update?: XOR<XOR<SettingsUpdateToOneWithWhereWithoutUserInput, SettingsUpdateWithoutUserInput>, SettingsUncheckedUpdateWithoutUserInput>
  }

  export type FoodLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput> | FoodLogCreateWithoutUserInput[] | FoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutUserInput | FoodLogCreateOrConnectWithoutUserInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutUserInput | FoodLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FoodLogCreateManyUserInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutUserInput | FoodLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutUserInput | FoodLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type WaterLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput> | WaterLogCreateWithoutUserInput[] | WaterLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WaterLogCreateOrConnectWithoutUserInput | WaterLogCreateOrConnectWithoutUserInput[]
    upsert?: WaterLogUpsertWithWhereUniqueWithoutUserInput | WaterLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WaterLogCreateManyUserInputEnvelope
    set?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    disconnect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    delete?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    connect?: WaterLogWhereUniqueInput | WaterLogWhereUniqueInput[]
    update?: WaterLogUpdateWithWhereUniqueWithoutUserInput | WaterLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WaterLogUpdateManyWithWhereWithoutUserInput | WaterLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
  }

  export type WeightLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput> | WeightLogCreateWithoutUserInput[] | WeightLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeightLogCreateOrConnectWithoutUserInput | WeightLogCreateOrConnectWithoutUserInput[]
    upsert?: WeightLogUpsertWithWhereUniqueWithoutUserInput | WeightLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeightLogCreateManyUserInputEnvelope
    set?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    disconnect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    delete?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    connect?: WeightLogWhereUniqueInput | WeightLogWhereUniqueInput[]
    update?: WeightLogUpdateWithWhereUniqueWithoutUserInput | WeightLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeightLogUpdateManyWithWhereWithoutUserInput | WeightLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type CustomFoodUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CustomFoodCreateWithoutUserInput, CustomFoodUncheckedCreateWithoutUserInput> | CustomFoodCreateWithoutUserInput[] | CustomFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomFoodCreateOrConnectWithoutUserInput | CustomFoodCreateOrConnectWithoutUserInput[]
    upsert?: CustomFoodUpsertWithWhereUniqueWithoutUserInput | CustomFoodUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CustomFoodCreateManyUserInputEnvelope
    set?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    disconnect?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    delete?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    connect?: CustomFoodWhereUniqueInput | CustomFoodWhereUniqueInput[]
    update?: CustomFoodUpdateWithWhereUniqueWithoutUserInput | CustomFoodUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CustomFoodUpdateManyWithWhereWithoutUserInput | CustomFoodUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CustomFoodScalarWhereInput | CustomFoodScalarWhereInput[]
  }

  export type RecipeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutUserInput | RecipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutUserInput | RecipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutUserInput | RecipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettingsInput, UserUpdateWithoutSettingsInput>, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type FoodLogCreateNestedManyWithoutFoodInput = {
    create?: XOR<FoodLogCreateWithoutFoodInput, FoodLogUncheckedCreateWithoutFoodInput> | FoodLogCreateWithoutFoodInput[] | FoodLogUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutFoodInput | FoodLogCreateOrConnectWithoutFoodInput[]
    createMany?: FoodLogCreateManyFoodInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type RecipeIngredientCreateNestedManyWithoutFoodInput = {
    create?: XOR<RecipeIngredientCreateWithoutFoodInput, RecipeIngredientUncheckedCreateWithoutFoodInput> | RecipeIngredientCreateWithoutFoodInput[] | RecipeIngredientUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutFoodInput | RecipeIngredientCreateOrConnectWithoutFoodInput[]
    createMany?: RecipeIngredientCreateManyFoodInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type FoodLogUncheckedCreateNestedManyWithoutFoodInput = {
    create?: XOR<FoodLogCreateWithoutFoodInput, FoodLogUncheckedCreateWithoutFoodInput> | FoodLogCreateWithoutFoodInput[] | FoodLogUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutFoodInput | FoodLogCreateOrConnectWithoutFoodInput[]
    createMany?: FoodLogCreateManyFoodInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type RecipeIngredientUncheckedCreateNestedManyWithoutFoodInput = {
    create?: XOR<RecipeIngredientCreateWithoutFoodInput, RecipeIngredientUncheckedCreateWithoutFoodInput> | RecipeIngredientCreateWithoutFoodInput[] | RecipeIngredientUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutFoodInput | RecipeIngredientCreateOrConnectWithoutFoodInput[]
    createMany?: RecipeIngredientCreateManyFoodInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type FoodLogUpdateManyWithoutFoodNestedInput = {
    create?: XOR<FoodLogCreateWithoutFoodInput, FoodLogUncheckedCreateWithoutFoodInput> | FoodLogCreateWithoutFoodInput[] | FoodLogUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutFoodInput | FoodLogCreateOrConnectWithoutFoodInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutFoodInput | FoodLogUpsertWithWhereUniqueWithoutFoodInput[]
    createMany?: FoodLogCreateManyFoodInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutFoodInput | FoodLogUpdateWithWhereUniqueWithoutFoodInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutFoodInput | FoodLogUpdateManyWithWhereWithoutFoodInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type RecipeIngredientUpdateManyWithoutFoodNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutFoodInput, RecipeIngredientUncheckedCreateWithoutFoodInput> | RecipeIngredientCreateWithoutFoodInput[] | RecipeIngredientUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutFoodInput | RecipeIngredientCreateOrConnectWithoutFoodInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutFoodInput | RecipeIngredientUpsertWithWhereUniqueWithoutFoodInput[]
    createMany?: RecipeIngredientCreateManyFoodInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutFoodInput | RecipeIngredientUpdateWithWhereUniqueWithoutFoodInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutFoodInput | RecipeIngredientUpdateManyWithWhereWithoutFoodInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type FoodLogUncheckedUpdateManyWithoutFoodNestedInput = {
    create?: XOR<FoodLogCreateWithoutFoodInput, FoodLogUncheckedCreateWithoutFoodInput> | FoodLogCreateWithoutFoodInput[] | FoodLogUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutFoodInput | FoodLogCreateOrConnectWithoutFoodInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutFoodInput | FoodLogUpsertWithWhereUniqueWithoutFoodInput[]
    createMany?: FoodLogCreateManyFoodInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutFoodInput | FoodLogUpdateWithWhereUniqueWithoutFoodInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutFoodInput | FoodLogUpdateManyWithWhereWithoutFoodInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutFoodNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutFoodInput, RecipeIngredientUncheckedCreateWithoutFoodInput> | RecipeIngredientCreateWithoutFoodInput[] | RecipeIngredientUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutFoodInput | RecipeIngredientCreateOrConnectWithoutFoodInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutFoodInput | RecipeIngredientUpsertWithWhereUniqueWithoutFoodInput[]
    createMany?: RecipeIngredientCreateManyFoodInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutFoodInput | RecipeIngredientUpdateWithWhereUniqueWithoutFoodInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutFoodInput | RecipeIngredientUpdateManyWithWhereWithoutFoodInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCustomFoodsInput = {
    create?: XOR<UserCreateWithoutCustomFoodsInput, UserUncheckedCreateWithoutCustomFoodsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomFoodsInput
    connect?: UserWhereUniqueInput
  }

  export type FoodLogCreateNestedManyWithoutCustomFoodInput = {
    create?: XOR<FoodLogCreateWithoutCustomFoodInput, FoodLogUncheckedCreateWithoutCustomFoodInput> | FoodLogCreateWithoutCustomFoodInput[] | FoodLogUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutCustomFoodInput | FoodLogCreateOrConnectWithoutCustomFoodInput[]
    createMany?: FoodLogCreateManyCustomFoodInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type RecipeIngredientCreateNestedManyWithoutCustomFoodInput = {
    create?: XOR<RecipeIngredientCreateWithoutCustomFoodInput, RecipeIngredientUncheckedCreateWithoutCustomFoodInput> | RecipeIngredientCreateWithoutCustomFoodInput[] | RecipeIngredientUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutCustomFoodInput | RecipeIngredientCreateOrConnectWithoutCustomFoodInput[]
    createMany?: RecipeIngredientCreateManyCustomFoodInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type FoodLogUncheckedCreateNestedManyWithoutCustomFoodInput = {
    create?: XOR<FoodLogCreateWithoutCustomFoodInput, FoodLogUncheckedCreateWithoutCustomFoodInput> | FoodLogCreateWithoutCustomFoodInput[] | FoodLogUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutCustomFoodInput | FoodLogCreateOrConnectWithoutCustomFoodInput[]
    createMany?: FoodLogCreateManyCustomFoodInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type RecipeIngredientUncheckedCreateNestedManyWithoutCustomFoodInput = {
    create?: XOR<RecipeIngredientCreateWithoutCustomFoodInput, RecipeIngredientUncheckedCreateWithoutCustomFoodInput> | RecipeIngredientCreateWithoutCustomFoodInput[] | RecipeIngredientUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutCustomFoodInput | RecipeIngredientCreateOrConnectWithoutCustomFoodInput[]
    createMany?: RecipeIngredientCreateManyCustomFoodInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCustomFoodsNestedInput = {
    create?: XOR<UserCreateWithoutCustomFoodsInput, UserUncheckedCreateWithoutCustomFoodsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomFoodsInput
    upsert?: UserUpsertWithoutCustomFoodsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomFoodsInput, UserUpdateWithoutCustomFoodsInput>, UserUncheckedUpdateWithoutCustomFoodsInput>
  }

  export type FoodLogUpdateManyWithoutCustomFoodNestedInput = {
    create?: XOR<FoodLogCreateWithoutCustomFoodInput, FoodLogUncheckedCreateWithoutCustomFoodInput> | FoodLogCreateWithoutCustomFoodInput[] | FoodLogUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutCustomFoodInput | FoodLogCreateOrConnectWithoutCustomFoodInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutCustomFoodInput | FoodLogUpsertWithWhereUniqueWithoutCustomFoodInput[]
    createMany?: FoodLogCreateManyCustomFoodInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutCustomFoodInput | FoodLogUpdateWithWhereUniqueWithoutCustomFoodInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutCustomFoodInput | FoodLogUpdateManyWithWhereWithoutCustomFoodInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type RecipeIngredientUpdateManyWithoutCustomFoodNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutCustomFoodInput, RecipeIngredientUncheckedCreateWithoutCustomFoodInput> | RecipeIngredientCreateWithoutCustomFoodInput[] | RecipeIngredientUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutCustomFoodInput | RecipeIngredientCreateOrConnectWithoutCustomFoodInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutCustomFoodInput | RecipeIngredientUpsertWithWhereUniqueWithoutCustomFoodInput[]
    createMany?: RecipeIngredientCreateManyCustomFoodInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutCustomFoodInput | RecipeIngredientUpdateWithWhereUniqueWithoutCustomFoodInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutCustomFoodInput | RecipeIngredientUpdateManyWithWhereWithoutCustomFoodInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type FoodLogUncheckedUpdateManyWithoutCustomFoodNestedInput = {
    create?: XOR<FoodLogCreateWithoutCustomFoodInput, FoodLogUncheckedCreateWithoutCustomFoodInput> | FoodLogCreateWithoutCustomFoodInput[] | FoodLogUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutCustomFoodInput | FoodLogCreateOrConnectWithoutCustomFoodInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutCustomFoodInput | FoodLogUpsertWithWhereUniqueWithoutCustomFoodInput[]
    createMany?: FoodLogCreateManyCustomFoodInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutCustomFoodInput | FoodLogUpdateWithWhereUniqueWithoutCustomFoodInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutCustomFoodInput | FoodLogUpdateManyWithWhereWithoutCustomFoodInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutCustomFoodNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutCustomFoodInput, RecipeIngredientUncheckedCreateWithoutCustomFoodInput> | RecipeIngredientCreateWithoutCustomFoodInput[] | RecipeIngredientUncheckedCreateWithoutCustomFoodInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutCustomFoodInput | RecipeIngredientCreateOrConnectWithoutCustomFoodInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutCustomFoodInput | RecipeIngredientUpsertWithWhereUniqueWithoutCustomFoodInput[]
    createMany?: RecipeIngredientCreateManyCustomFoodInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutCustomFoodInput | RecipeIngredientUpdateWithWhereUniqueWithoutCustomFoodInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutCustomFoodInput | RecipeIngredientUpdateManyWithWhereWithoutCustomFoodInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRecipesInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeIngredientCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type FoodLogCreateNestedManyWithoutRecipeInput = {
    create?: XOR<FoodLogCreateWithoutRecipeInput, FoodLogUncheckedCreateWithoutRecipeInput> | FoodLogCreateWithoutRecipeInput[] | FoodLogUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutRecipeInput | FoodLogCreateOrConnectWithoutRecipeInput[]
    createMany?: FoodLogCreateManyRecipeInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type FoodLogUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<FoodLogCreateWithoutRecipeInput, FoodLogUncheckedCreateWithoutRecipeInput> | FoodLogCreateWithoutRecipeInput[] | FoodLogUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutRecipeInput | FoodLogCreateOrConnectWithoutRecipeInput[]
    createMany?: FoodLogCreateManyRecipeInputEnvelope
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    upsert?: UserUpsertWithoutRecipesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecipesInput, UserUpdateWithoutRecipesInput>, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type RecipeIngredientUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutRecipeInput | RecipeIngredientUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type FoodLogUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<FoodLogCreateWithoutRecipeInput, FoodLogUncheckedCreateWithoutRecipeInput> | FoodLogCreateWithoutRecipeInput[] | FoodLogUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutRecipeInput | FoodLogCreateOrConnectWithoutRecipeInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutRecipeInput | FoodLogUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: FoodLogCreateManyRecipeInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutRecipeInput | FoodLogUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutRecipeInput | FoodLogUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutRecipeInput | RecipeIngredientUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type FoodLogUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<FoodLogCreateWithoutRecipeInput, FoodLogUncheckedCreateWithoutRecipeInput> | FoodLogCreateWithoutRecipeInput[] | FoodLogUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: FoodLogCreateOrConnectWithoutRecipeInput | FoodLogCreateOrConnectWithoutRecipeInput[]
    upsert?: FoodLogUpsertWithWhereUniqueWithoutRecipeInput | FoodLogUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: FoodLogCreateManyRecipeInputEnvelope
    set?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    disconnect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    delete?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    connect?: FoodLogWhereUniqueInput | FoodLogWhereUniqueInput[]
    update?: FoodLogUpdateWithWhereUniqueWithoutRecipeInput | FoodLogUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: FoodLogUpdateManyWithWhereWithoutRecipeInput | FoodLogUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
  }

  export type RecipeCreateNestedOneWithoutIngredientsInput = {
    create?: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutIngredientsInput
    connect?: RecipeWhereUniqueInput
  }

  export type FoodCreateNestedOneWithoutRecipeIngredientsInput = {
    create?: XOR<FoodCreateWithoutRecipeIngredientsInput, FoodUncheckedCreateWithoutRecipeIngredientsInput>
    connectOrCreate?: FoodCreateOrConnectWithoutRecipeIngredientsInput
    connect?: FoodWhereUniqueInput
  }

  export type CustomFoodCreateNestedOneWithoutRecipeIngredientsInput = {
    create?: XOR<CustomFoodCreateWithoutRecipeIngredientsInput, CustomFoodUncheckedCreateWithoutRecipeIngredientsInput>
    connectOrCreate?: CustomFoodCreateOrConnectWithoutRecipeIngredientsInput
    connect?: CustomFoodWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RecipeUpdateOneRequiredWithoutIngredientsNestedInput = {
    create?: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutIngredientsInput
    upsert?: RecipeUpsertWithoutIngredientsInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutIngredientsInput, RecipeUpdateWithoutIngredientsInput>, RecipeUncheckedUpdateWithoutIngredientsInput>
  }

  export type FoodUpdateOneWithoutRecipeIngredientsNestedInput = {
    create?: XOR<FoodCreateWithoutRecipeIngredientsInput, FoodUncheckedCreateWithoutRecipeIngredientsInput>
    connectOrCreate?: FoodCreateOrConnectWithoutRecipeIngredientsInput
    upsert?: FoodUpsertWithoutRecipeIngredientsInput
    disconnect?: FoodWhereInput | boolean
    delete?: FoodWhereInput | boolean
    connect?: FoodWhereUniqueInput
    update?: XOR<XOR<FoodUpdateToOneWithWhereWithoutRecipeIngredientsInput, FoodUpdateWithoutRecipeIngredientsInput>, FoodUncheckedUpdateWithoutRecipeIngredientsInput>
  }

  export type CustomFoodUpdateOneWithoutRecipeIngredientsNestedInput = {
    create?: XOR<CustomFoodCreateWithoutRecipeIngredientsInput, CustomFoodUncheckedCreateWithoutRecipeIngredientsInput>
    connectOrCreate?: CustomFoodCreateOrConnectWithoutRecipeIngredientsInput
    upsert?: CustomFoodUpsertWithoutRecipeIngredientsInput
    disconnect?: CustomFoodWhereInput | boolean
    delete?: CustomFoodWhereInput | boolean
    connect?: CustomFoodWhereUniqueInput
    update?: XOR<XOR<CustomFoodUpdateToOneWithWhereWithoutRecipeIngredientsInput, CustomFoodUpdateWithoutRecipeIngredientsInput>, CustomFoodUncheckedUpdateWithoutRecipeIngredientsInput>
  }

  export type UserCreateNestedOneWithoutFoodLogsInput = {
    create?: XOR<UserCreateWithoutFoodLogsInput, UserUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoodLogsInput
    connect?: UserWhereUniqueInput
  }

  export type FoodCreateNestedOneWithoutFoodLogsInput = {
    create?: XOR<FoodCreateWithoutFoodLogsInput, FoodUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: FoodCreateOrConnectWithoutFoodLogsInput
    connect?: FoodWhereUniqueInput
  }

  export type CustomFoodCreateNestedOneWithoutFoodLogsInput = {
    create?: XOR<CustomFoodCreateWithoutFoodLogsInput, CustomFoodUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: CustomFoodCreateOrConnectWithoutFoodLogsInput
    connect?: CustomFoodWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutFoodLogsInput = {
    create?: XOR<RecipeCreateWithoutFoodLogsInput, RecipeUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutFoodLogsInput
    connect?: RecipeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFoodLogsNestedInput = {
    create?: XOR<UserCreateWithoutFoodLogsInput, UserUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoodLogsInput
    upsert?: UserUpsertWithoutFoodLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFoodLogsInput, UserUpdateWithoutFoodLogsInput>, UserUncheckedUpdateWithoutFoodLogsInput>
  }

  export type FoodUpdateOneWithoutFoodLogsNestedInput = {
    create?: XOR<FoodCreateWithoutFoodLogsInput, FoodUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: FoodCreateOrConnectWithoutFoodLogsInput
    upsert?: FoodUpsertWithoutFoodLogsInput
    disconnect?: FoodWhereInput | boolean
    delete?: FoodWhereInput | boolean
    connect?: FoodWhereUniqueInput
    update?: XOR<XOR<FoodUpdateToOneWithWhereWithoutFoodLogsInput, FoodUpdateWithoutFoodLogsInput>, FoodUncheckedUpdateWithoutFoodLogsInput>
  }

  export type CustomFoodUpdateOneWithoutFoodLogsNestedInput = {
    create?: XOR<CustomFoodCreateWithoutFoodLogsInput, CustomFoodUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: CustomFoodCreateOrConnectWithoutFoodLogsInput
    upsert?: CustomFoodUpsertWithoutFoodLogsInput
    disconnect?: CustomFoodWhereInput | boolean
    delete?: CustomFoodWhereInput | boolean
    connect?: CustomFoodWhereUniqueInput
    update?: XOR<XOR<CustomFoodUpdateToOneWithWhereWithoutFoodLogsInput, CustomFoodUpdateWithoutFoodLogsInput>, CustomFoodUncheckedUpdateWithoutFoodLogsInput>
  }

  export type RecipeUpdateOneWithoutFoodLogsNestedInput = {
    create?: XOR<RecipeCreateWithoutFoodLogsInput, RecipeUncheckedCreateWithoutFoodLogsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutFoodLogsInput
    upsert?: RecipeUpsertWithoutFoodLogsInput
    disconnect?: RecipeWhereInput | boolean
    delete?: RecipeWhereInput | boolean
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutFoodLogsInput, RecipeUpdateWithoutFoodLogsInput>, RecipeUncheckedUpdateWithoutFoodLogsInput>
  }

  export type UserCreateNestedOneWithoutWaterLogsInput = {
    create?: XOR<UserCreateWithoutWaterLogsInput, UserUncheckedCreateWithoutWaterLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWaterLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWaterLogsNestedInput = {
    create?: XOR<UserCreateWithoutWaterLogsInput, UserUncheckedCreateWithoutWaterLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWaterLogsInput
    upsert?: UserUpsertWithoutWaterLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWaterLogsInput, UserUpdateWithoutWaterLogsInput>, UserUncheckedUpdateWithoutWaterLogsInput>
  }

  export type UserCreateNestedOneWithoutWeightLogsInput = {
    create?: XOR<UserCreateWithoutWeightLogsInput, UserUncheckedCreateWithoutWeightLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWeightLogsNestedInput = {
    create?: XOR<UserCreateWithoutWeightLogsInput, UserUncheckedCreateWithoutWeightLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeightLogsInput
    upsert?: UserUpsertWithoutWeightLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWeightLogsInput, UserUpdateWithoutWeightLogsInput>, UserUncheckedUpdateWithoutWeightLogsInput>
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SettingsCreateWithoutUserInput = {
    id?: string
    darkMode?: boolean
    units?: string
    waterGoal?: number
    calorieGoal?: number | null
    proteinGoal?: number | null
    carbsGoal?: number | null
    fatGoal?: number | null
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUncheckedCreateWithoutUserInput = {
    id?: string
    darkMode?: boolean
    units?: string
    waterGoal?: number
    calorieGoal?: number | null
    proteinGoal?: number | null
    carbsGoal?: number | null
    fatGoal?: number | null
    notifWater?: boolean
    notifMeals?: boolean
    notifWorkout?: boolean
    notifWeight?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsCreateOrConnectWithoutUserInput = {
    where: SettingsWhereUniqueInput
    create: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
  }

  export type FoodLogCreateWithoutUserInput = {
    id?: string
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    food?: FoodCreateNestedOneWithoutFoodLogsInput
    customFood?: CustomFoodCreateNestedOneWithoutFoodLogsInput
    recipe?: RecipeCreateNestedOneWithoutFoodLogsInput
  }

  export type FoodLogUncheckedCreateWithoutUserInput = {
    id?: string
    foodId?: string | null
    customFoodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodLogCreateOrConnectWithoutUserInput = {
    where: FoodLogWhereUniqueInput
    create: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput>
  }

  export type FoodLogCreateManyUserInputEnvelope = {
    data: FoodLogCreateManyUserInput | FoodLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WaterLogCreateWithoutUserInput = {
    id?: string
    amount: number
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WaterLogUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WaterLogCreateOrConnectWithoutUserInput = {
    where: WaterLogWhereUniqueInput
    create: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput>
  }

  export type WaterLogCreateManyUserInputEnvelope = {
    data: WaterLogCreateManyUserInput | WaterLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WeightLogCreateWithoutUserInput = {
    id?: string
    weight: number
    note?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WeightLogUncheckedCreateWithoutUserInput = {
    id?: string
    weight: number
    note?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WeightLogCreateOrConnectWithoutUserInput = {
    where: WeightLogWhereUniqueInput
    create: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput>
  }

  export type WeightLogCreateManyUserInputEnvelope = {
    data: WeightLogCreateManyUserInput | WeightLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutUserInput = {
    id?: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes?: string | null
    sets?: number | null
    reps?: number | null
    weightUsed?: number | null
    muscleGroup?: string | null
    startWeight?: number | null
    startReps?: number | null
    endWeight?: number | null
    endReps?: number | null
    totalVolume?: number | null
    distance?: number | null
    speed?: number | null
    pace?: number | null
    stroke?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes?: string | null
    sets?: number | null
    reps?: number | null
    weightUsed?: number | null
    muscleGroup?: string | null
    startWeight?: number | null
    startReps?: number | null
    endWeight?: number | null
    endReps?: number | null
    totalVolume?: number | null
    distance?: number | null
    speed?: number | null
    pace?: number | null
    stroke?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CustomFoodCreateWithoutUserInput = {
    id?: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogCreateNestedManyWithoutCustomFoodInput
    recipeIngredients?: RecipeIngredientCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutCustomFoodInput
    recipeIngredients?: RecipeIngredientUncheckedCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodCreateOrConnectWithoutUserInput = {
    where: CustomFoodWhereUniqueInput
    create: XOR<CustomFoodCreateWithoutUserInput, CustomFoodUncheckedCreateWithoutUserInput>
  }

  export type CustomFoodCreateManyUserInputEnvelope = {
    data: CustomFoodCreateManyUserInput | CustomFoodCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecipeCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
    foodLogs?: FoodLogCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutUserInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput>
  }

  export type RecipeCreateManyUserInputEnvelope = {
    data: RecipeCreateManyUserInput | RecipeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SettingsUpsertWithoutUserInput = {
    update: XOR<SettingsUpdateWithoutUserInput, SettingsUncheckedUpdateWithoutUserInput>
    create: XOR<SettingsCreateWithoutUserInput, SettingsUncheckedCreateWithoutUserInput>
    where?: SettingsWhereInput
  }

  export type SettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: SettingsWhereInput
    data: XOR<SettingsUpdateWithoutUserInput, SettingsUncheckedUpdateWithoutUserInput>
  }

  export type SettingsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    units?: StringFieldUpdateOperationsInput | string
    waterGoal?: FloatFieldUpdateOperationsInput | number
    calorieGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    proteinGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    fatGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    notifWater?: BoolFieldUpdateOperationsInput | boolean
    notifMeals?: BoolFieldUpdateOperationsInput | boolean
    notifWorkout?: BoolFieldUpdateOperationsInput | boolean
    notifWeight?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    units?: StringFieldUpdateOperationsInput | string
    waterGoal?: FloatFieldUpdateOperationsInput | number
    calorieGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    proteinGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    carbsGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    fatGoal?: NullableFloatFieldUpdateOperationsInput | number | null
    notifWater?: BoolFieldUpdateOperationsInput | boolean
    notifMeals?: BoolFieldUpdateOperationsInput | boolean
    notifWorkout?: BoolFieldUpdateOperationsInput | boolean
    notifWeight?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUpsertWithWhereUniqueWithoutUserInput = {
    where: FoodLogWhereUniqueInput
    update: XOR<FoodLogUpdateWithoutUserInput, FoodLogUncheckedUpdateWithoutUserInput>
    create: XOR<FoodLogCreateWithoutUserInput, FoodLogUncheckedCreateWithoutUserInput>
  }

  export type FoodLogUpdateWithWhereUniqueWithoutUserInput = {
    where: FoodLogWhereUniqueInput
    data: XOR<FoodLogUpdateWithoutUserInput, FoodLogUncheckedUpdateWithoutUserInput>
  }

  export type FoodLogUpdateManyWithWhereWithoutUserInput = {
    where: FoodLogScalarWhereInput
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyWithoutUserInput>
  }

  export type FoodLogScalarWhereInput = {
    AND?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
    OR?: FoodLogScalarWhereInput[]
    NOT?: FoodLogScalarWhereInput | FoodLogScalarWhereInput[]
    id?: StringFilter<"FoodLog"> | string
    userId?: StringFilter<"FoodLog"> | string
    foodId?: StringNullableFilter<"FoodLog"> | string | null
    customFoodId?: StringNullableFilter<"FoodLog"> | string | null
    recipeId?: StringNullableFilter<"FoodLog"> | string | null
    mealType?: StringFilter<"FoodLog"> | string
    amount?: FloatFilter<"FoodLog"> | number
    calories?: FloatFilter<"FoodLog"> | number
    protein?: FloatFilter<"FoodLog"> | number
    carbs?: FloatFilter<"FoodLog"> | number
    fat?: FloatFilter<"FoodLog"> | number
    fiber?: FloatFilter<"FoodLog"> | number
    logDate?: DateTimeFilter<"FoodLog"> | Date | string
    createdAt?: DateTimeFilter<"FoodLog"> | Date | string
    updatedAt?: DateTimeFilter<"FoodLog"> | Date | string
  }

  export type WaterLogUpsertWithWhereUniqueWithoutUserInput = {
    where: WaterLogWhereUniqueInput
    update: XOR<WaterLogUpdateWithoutUserInput, WaterLogUncheckedUpdateWithoutUserInput>
    create: XOR<WaterLogCreateWithoutUserInput, WaterLogUncheckedCreateWithoutUserInput>
  }

  export type WaterLogUpdateWithWhereUniqueWithoutUserInput = {
    where: WaterLogWhereUniqueInput
    data: XOR<WaterLogUpdateWithoutUserInput, WaterLogUncheckedUpdateWithoutUserInput>
  }

  export type WaterLogUpdateManyWithWhereWithoutUserInput = {
    where: WaterLogScalarWhereInput
    data: XOR<WaterLogUpdateManyMutationInput, WaterLogUncheckedUpdateManyWithoutUserInput>
  }

  export type WaterLogScalarWhereInput = {
    AND?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
    OR?: WaterLogScalarWhereInput[]
    NOT?: WaterLogScalarWhereInput | WaterLogScalarWhereInput[]
    id?: StringFilter<"WaterLog"> | string
    userId?: StringFilter<"WaterLog"> | string
    amount?: FloatFilter<"WaterLog"> | number
    logDate?: DateTimeFilter<"WaterLog"> | Date | string
    createdAt?: DateTimeFilter<"WaterLog"> | Date | string
  }

  export type WeightLogUpsertWithWhereUniqueWithoutUserInput = {
    where: WeightLogWhereUniqueInput
    update: XOR<WeightLogUpdateWithoutUserInput, WeightLogUncheckedUpdateWithoutUserInput>
    create: XOR<WeightLogCreateWithoutUserInput, WeightLogUncheckedCreateWithoutUserInput>
  }

  export type WeightLogUpdateWithWhereUniqueWithoutUserInput = {
    where: WeightLogWhereUniqueInput
    data: XOR<WeightLogUpdateWithoutUserInput, WeightLogUncheckedUpdateWithoutUserInput>
  }

  export type WeightLogUpdateManyWithWhereWithoutUserInput = {
    where: WeightLogScalarWhereInput
    data: XOR<WeightLogUpdateManyMutationInput, WeightLogUncheckedUpdateManyWithoutUserInput>
  }

  export type WeightLogScalarWhereInput = {
    AND?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
    OR?: WeightLogScalarWhereInput[]
    NOT?: WeightLogScalarWhereInput | WeightLogScalarWhereInput[]
    id?: StringFilter<"WeightLog"> | string
    userId?: StringFilter<"WeightLog"> | string
    weight?: FloatFilter<"WeightLog"> | number
    note?: StringNullableFilter<"WeightLog"> | string | null
    logDate?: DateTimeFilter<"WeightLog"> | Date | string
    createdAt?: DateTimeFilter<"WeightLog"> | Date | string
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    userId?: StringFilter<"ActivityLog"> | string
    activityType?: StringFilter<"ActivityLog"> | string
    name?: StringFilter<"ActivityLog"> | string
    duration?: FloatFilter<"ActivityLog"> | number
    caloriesBurned?: FloatFilter<"ActivityLog"> | number
    notes?: StringNullableFilter<"ActivityLog"> | string | null
    sets?: IntNullableFilter<"ActivityLog"> | number | null
    reps?: IntNullableFilter<"ActivityLog"> | number | null
    weightUsed?: FloatNullableFilter<"ActivityLog"> | number | null
    muscleGroup?: StringNullableFilter<"ActivityLog"> | string | null
    startWeight?: FloatNullableFilter<"ActivityLog"> | number | null
    startReps?: IntNullableFilter<"ActivityLog"> | number | null
    endWeight?: FloatNullableFilter<"ActivityLog"> | number | null
    endReps?: IntNullableFilter<"ActivityLog"> | number | null
    totalVolume?: FloatNullableFilter<"ActivityLog"> | number | null
    distance?: FloatNullableFilter<"ActivityLog"> | number | null
    speed?: FloatNullableFilter<"ActivityLog"> | number | null
    pace?: FloatNullableFilter<"ActivityLog"> | number | null
    stroke?: StringNullableFilter<"ActivityLog"> | string | null
    logDate?: DateTimeFilter<"ActivityLog"> | Date | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type CustomFoodUpsertWithWhereUniqueWithoutUserInput = {
    where: CustomFoodWhereUniqueInput
    update: XOR<CustomFoodUpdateWithoutUserInput, CustomFoodUncheckedUpdateWithoutUserInput>
    create: XOR<CustomFoodCreateWithoutUserInput, CustomFoodUncheckedCreateWithoutUserInput>
  }

  export type CustomFoodUpdateWithWhereUniqueWithoutUserInput = {
    where: CustomFoodWhereUniqueInput
    data: XOR<CustomFoodUpdateWithoutUserInput, CustomFoodUncheckedUpdateWithoutUserInput>
  }

  export type CustomFoodUpdateManyWithWhereWithoutUserInput = {
    where: CustomFoodScalarWhereInput
    data: XOR<CustomFoodUpdateManyMutationInput, CustomFoodUncheckedUpdateManyWithoutUserInput>
  }

  export type CustomFoodScalarWhereInput = {
    AND?: CustomFoodScalarWhereInput | CustomFoodScalarWhereInput[]
    OR?: CustomFoodScalarWhereInput[]
    NOT?: CustomFoodScalarWhereInput | CustomFoodScalarWhereInput[]
    id?: StringFilter<"CustomFood"> | string
    userId?: StringFilter<"CustomFood"> | string
    name?: StringFilter<"CustomFood"> | string
    category?: StringFilter<"CustomFood"> | string
    servingSize?: FloatFilter<"CustomFood"> | number
    servingUnit?: StringFilter<"CustomFood"> | string
    calories?: FloatFilter<"CustomFood"> | number
    protein?: FloatFilter<"CustomFood"> | number
    carbs?: FloatFilter<"CustomFood"> | number
    fat?: FloatFilter<"CustomFood"> | number
    fiber?: FloatFilter<"CustomFood"> | number
    sugar?: FloatFilter<"CustomFood"> | number
    sodium?: FloatFilter<"CustomFood"> | number
    createdAt?: DateTimeFilter<"CustomFood"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFood"> | Date | string
  }

  export type RecipeUpsertWithWhereUniqueWithoutUserInput = {
    where: RecipeWhereUniqueInput
    update: XOR<RecipeUpdateWithoutUserInput, RecipeUncheckedUpdateWithoutUserInput>
    create: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput>
  }

  export type RecipeUpdateWithWhereUniqueWithoutUserInput = {
    where: RecipeWhereUniqueInput
    data: XOR<RecipeUpdateWithoutUserInput, RecipeUncheckedUpdateWithoutUserInput>
  }

  export type RecipeUpdateManyWithWhereWithoutUserInput = {
    where: RecipeScalarWhereInput
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyWithoutUserInput>
  }

  export type RecipeScalarWhereInput = {
    AND?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    OR?: RecipeScalarWhereInput[]
    NOT?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    id?: StringFilter<"Recipe"> | string
    userId?: StringFilter<"Recipe"> | string
    name?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    servings?: FloatFilter<"Recipe"> | number
    servingSize?: FloatFilter<"Recipe"> | number
    servingUnit?: StringFilter<"Recipe"> | string
    calories?: FloatFilter<"Recipe"> | number
    protein?: FloatFilter<"Recipe"> | number
    carbs?: FloatFilter<"Recipe"> | number
    fat?: FloatFilter<"Recipe"> | number
    fiber?: FloatFilter<"Recipe"> | number
    sugar?: FloatFilter<"Recipe"> | number
    sodium?: FloatFilter<"Recipe"> | number
    totalWeight?: FloatFilter<"Recipe"> | number
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutSettingsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FoodLogCreateWithoutFoodInput = {
    id?: string
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFoodLogsInput
    customFood?: CustomFoodCreateNestedOneWithoutFoodLogsInput
    recipe?: RecipeCreateNestedOneWithoutFoodLogsInput
  }

  export type FoodLogUncheckedCreateWithoutFoodInput = {
    id?: string
    userId: string
    customFoodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodLogCreateOrConnectWithoutFoodInput = {
    where: FoodLogWhereUniqueInput
    create: XOR<FoodLogCreateWithoutFoodInput, FoodLogUncheckedCreateWithoutFoodInput>
  }

  export type FoodLogCreateManyFoodInputEnvelope = {
    data: FoodLogCreateManyFoodInput | FoodLogCreateManyFoodInput[]
    skipDuplicates?: boolean
  }

  export type RecipeIngredientCreateWithoutFoodInput = {
    id?: string
    name: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
    recipe: RecipeCreateNestedOneWithoutIngredientsInput
    customFood?: CustomFoodCreateNestedOneWithoutRecipeIngredientsInput
  }

  export type RecipeIngredientUncheckedCreateWithoutFoodInput = {
    id?: string
    recipeId: string
    name: string
    customFoodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type RecipeIngredientCreateOrConnectWithoutFoodInput = {
    where: RecipeIngredientWhereUniqueInput
    create: XOR<RecipeIngredientCreateWithoutFoodInput, RecipeIngredientUncheckedCreateWithoutFoodInput>
  }

  export type RecipeIngredientCreateManyFoodInputEnvelope = {
    data: RecipeIngredientCreateManyFoodInput | RecipeIngredientCreateManyFoodInput[]
    skipDuplicates?: boolean
  }

  export type FoodLogUpsertWithWhereUniqueWithoutFoodInput = {
    where: FoodLogWhereUniqueInput
    update: XOR<FoodLogUpdateWithoutFoodInput, FoodLogUncheckedUpdateWithoutFoodInput>
    create: XOR<FoodLogCreateWithoutFoodInput, FoodLogUncheckedCreateWithoutFoodInput>
  }

  export type FoodLogUpdateWithWhereUniqueWithoutFoodInput = {
    where: FoodLogWhereUniqueInput
    data: XOR<FoodLogUpdateWithoutFoodInput, FoodLogUncheckedUpdateWithoutFoodInput>
  }

  export type FoodLogUpdateManyWithWhereWithoutFoodInput = {
    where: FoodLogScalarWhereInput
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyWithoutFoodInput>
  }

  export type RecipeIngredientUpsertWithWhereUniqueWithoutFoodInput = {
    where: RecipeIngredientWhereUniqueInput
    update: XOR<RecipeIngredientUpdateWithoutFoodInput, RecipeIngredientUncheckedUpdateWithoutFoodInput>
    create: XOR<RecipeIngredientCreateWithoutFoodInput, RecipeIngredientUncheckedCreateWithoutFoodInput>
  }

  export type RecipeIngredientUpdateWithWhereUniqueWithoutFoodInput = {
    where: RecipeIngredientWhereUniqueInput
    data: XOR<RecipeIngredientUpdateWithoutFoodInput, RecipeIngredientUncheckedUpdateWithoutFoodInput>
  }

  export type RecipeIngredientUpdateManyWithWhereWithoutFoodInput = {
    where: RecipeIngredientScalarWhereInput
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyWithoutFoodInput>
  }

  export type RecipeIngredientScalarWhereInput = {
    AND?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
    OR?: RecipeIngredientScalarWhereInput[]
    NOT?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
    id?: StringFilter<"RecipeIngredient"> | string
    recipeId?: StringFilter<"RecipeIngredient"> | string
    name?: StringFilter<"RecipeIngredient"> | string
    foodId?: StringNullableFilter<"RecipeIngredient"> | string | null
    customFoodId?: StringNullableFilter<"RecipeIngredient"> | string | null
    amount?: FloatFilter<"RecipeIngredient"> | number
    calories?: FloatFilter<"RecipeIngredient"> | number
    protein?: FloatFilter<"RecipeIngredient"> | number
    carbs?: FloatFilter<"RecipeIngredient"> | number
    fat?: FloatFilter<"RecipeIngredient"> | number
    fiber?: FloatFilter<"RecipeIngredient"> | number
    sortOrder?: IntFilter<"RecipeIngredient"> | number
  }

  export type UserCreateWithoutCustomFoodsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomFoodsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomFoodsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomFoodsInput, UserUncheckedCreateWithoutCustomFoodsInput>
  }

  export type FoodLogCreateWithoutCustomFoodInput = {
    id?: string
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFoodLogsInput
    food?: FoodCreateNestedOneWithoutFoodLogsInput
    recipe?: RecipeCreateNestedOneWithoutFoodLogsInput
  }

  export type FoodLogUncheckedCreateWithoutCustomFoodInput = {
    id?: string
    userId: string
    foodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodLogCreateOrConnectWithoutCustomFoodInput = {
    where: FoodLogWhereUniqueInput
    create: XOR<FoodLogCreateWithoutCustomFoodInput, FoodLogUncheckedCreateWithoutCustomFoodInput>
  }

  export type FoodLogCreateManyCustomFoodInputEnvelope = {
    data: FoodLogCreateManyCustomFoodInput | FoodLogCreateManyCustomFoodInput[]
    skipDuplicates?: boolean
  }

  export type RecipeIngredientCreateWithoutCustomFoodInput = {
    id?: string
    name: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
    recipe: RecipeCreateNestedOneWithoutIngredientsInput
    food?: FoodCreateNestedOneWithoutRecipeIngredientsInput
  }

  export type RecipeIngredientUncheckedCreateWithoutCustomFoodInput = {
    id?: string
    recipeId: string
    name: string
    foodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type RecipeIngredientCreateOrConnectWithoutCustomFoodInput = {
    where: RecipeIngredientWhereUniqueInput
    create: XOR<RecipeIngredientCreateWithoutCustomFoodInput, RecipeIngredientUncheckedCreateWithoutCustomFoodInput>
  }

  export type RecipeIngredientCreateManyCustomFoodInputEnvelope = {
    data: RecipeIngredientCreateManyCustomFoodInput | RecipeIngredientCreateManyCustomFoodInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCustomFoodsInput = {
    update: XOR<UserUpdateWithoutCustomFoodsInput, UserUncheckedUpdateWithoutCustomFoodsInput>
    create: XOR<UserCreateWithoutCustomFoodsInput, UserUncheckedCreateWithoutCustomFoodsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomFoodsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomFoodsInput, UserUncheckedUpdateWithoutCustomFoodsInput>
  }

  export type UserUpdateWithoutCustomFoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomFoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FoodLogUpsertWithWhereUniqueWithoutCustomFoodInput = {
    where: FoodLogWhereUniqueInput
    update: XOR<FoodLogUpdateWithoutCustomFoodInput, FoodLogUncheckedUpdateWithoutCustomFoodInput>
    create: XOR<FoodLogCreateWithoutCustomFoodInput, FoodLogUncheckedCreateWithoutCustomFoodInput>
  }

  export type FoodLogUpdateWithWhereUniqueWithoutCustomFoodInput = {
    where: FoodLogWhereUniqueInput
    data: XOR<FoodLogUpdateWithoutCustomFoodInput, FoodLogUncheckedUpdateWithoutCustomFoodInput>
  }

  export type FoodLogUpdateManyWithWhereWithoutCustomFoodInput = {
    where: FoodLogScalarWhereInput
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyWithoutCustomFoodInput>
  }

  export type RecipeIngredientUpsertWithWhereUniqueWithoutCustomFoodInput = {
    where: RecipeIngredientWhereUniqueInput
    update: XOR<RecipeIngredientUpdateWithoutCustomFoodInput, RecipeIngredientUncheckedUpdateWithoutCustomFoodInput>
    create: XOR<RecipeIngredientCreateWithoutCustomFoodInput, RecipeIngredientUncheckedCreateWithoutCustomFoodInput>
  }

  export type RecipeIngredientUpdateWithWhereUniqueWithoutCustomFoodInput = {
    where: RecipeIngredientWhereUniqueInput
    data: XOR<RecipeIngredientUpdateWithoutCustomFoodInput, RecipeIngredientUncheckedUpdateWithoutCustomFoodInput>
  }

  export type RecipeIngredientUpdateManyWithWhereWithoutCustomFoodInput = {
    where: RecipeIngredientScalarWhereInput
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyWithoutCustomFoodInput>
  }

  export type UserCreateWithoutRecipesInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecipesInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecipesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
  }

  export type RecipeIngredientCreateWithoutRecipeInput = {
    id?: string
    name: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
    food?: FoodCreateNestedOneWithoutRecipeIngredientsInput
    customFood?: CustomFoodCreateNestedOneWithoutRecipeIngredientsInput
  }

  export type RecipeIngredientUncheckedCreateWithoutRecipeInput = {
    id?: string
    name: string
    foodId?: string | null
    customFoodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type RecipeIngredientCreateOrConnectWithoutRecipeInput = {
    where: RecipeIngredientWhereUniqueInput
    create: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeIngredientCreateManyRecipeInputEnvelope = {
    data: RecipeIngredientCreateManyRecipeInput | RecipeIngredientCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type FoodLogCreateWithoutRecipeInput = {
    id?: string
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFoodLogsInput
    food?: FoodCreateNestedOneWithoutFoodLogsInput
    customFood?: CustomFoodCreateNestedOneWithoutFoodLogsInput
  }

  export type FoodLogUncheckedCreateWithoutRecipeInput = {
    id?: string
    userId: string
    foodId?: string | null
    customFoodId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoodLogCreateOrConnectWithoutRecipeInput = {
    where: FoodLogWhereUniqueInput
    create: XOR<FoodLogCreateWithoutRecipeInput, FoodLogUncheckedCreateWithoutRecipeInput>
  }

  export type FoodLogCreateManyRecipeInputEnvelope = {
    data: FoodLogCreateManyRecipeInput | FoodLogCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRecipesInput = {
    update: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecipesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type UserUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeIngredientWhereUniqueInput
    update: XOR<RecipeIngredientUpdateWithoutRecipeInput, RecipeIngredientUncheckedUpdateWithoutRecipeInput>
    create: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeIngredientWhereUniqueInput
    data: XOR<RecipeIngredientUpdateWithoutRecipeInput, RecipeIngredientUncheckedUpdateWithoutRecipeInput>
  }

  export type RecipeIngredientUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeIngredientScalarWhereInput
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyWithoutRecipeInput>
  }

  export type FoodLogUpsertWithWhereUniqueWithoutRecipeInput = {
    where: FoodLogWhereUniqueInput
    update: XOR<FoodLogUpdateWithoutRecipeInput, FoodLogUncheckedUpdateWithoutRecipeInput>
    create: XOR<FoodLogCreateWithoutRecipeInput, FoodLogUncheckedCreateWithoutRecipeInput>
  }

  export type FoodLogUpdateWithWhereUniqueWithoutRecipeInput = {
    where: FoodLogWhereUniqueInput
    data: XOR<FoodLogUpdateWithoutRecipeInput, FoodLogUncheckedUpdateWithoutRecipeInput>
  }

  export type FoodLogUpdateManyWithWhereWithoutRecipeInput = {
    where: FoodLogScalarWhereInput
    data: XOR<FoodLogUpdateManyMutationInput, FoodLogUncheckedUpdateManyWithoutRecipeInput>
  }

  export type RecipeCreateWithoutIngredientsInput = {
    id?: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRecipesInput
    foodLogs?: FoodLogCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutIngredientsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutIngredientsInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
  }

  export type FoodCreateWithoutRecipeIngredientsInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogCreateNestedManyWithoutFoodInput
  }

  export type FoodUncheckedCreateWithoutRecipeIngredientsInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutFoodInput
  }

  export type FoodCreateOrConnectWithoutRecipeIngredientsInput = {
    where: FoodWhereUniqueInput
    create: XOR<FoodCreateWithoutRecipeIngredientsInput, FoodUncheckedCreateWithoutRecipeIngredientsInput>
  }

  export type CustomFoodCreateWithoutRecipeIngredientsInput = {
    id?: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCustomFoodsInput
    foodLogs?: FoodLogCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodUncheckedCreateWithoutRecipeIngredientsInput = {
    id?: string
    userId: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodCreateOrConnectWithoutRecipeIngredientsInput = {
    where: CustomFoodWhereUniqueInput
    create: XOR<CustomFoodCreateWithoutRecipeIngredientsInput, CustomFoodUncheckedCreateWithoutRecipeIngredientsInput>
  }

  export type RecipeUpsertWithoutIngredientsInput = {
    update: XOR<RecipeUpdateWithoutIngredientsInput, RecipeUncheckedUpdateWithoutIngredientsInput>
    create: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutIngredientsInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutIngredientsInput, RecipeUncheckedUpdateWithoutIngredientsInput>
  }

  export type RecipeUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput
    foodLogs?: FoodLogUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type FoodUpsertWithoutRecipeIngredientsInput = {
    update: XOR<FoodUpdateWithoutRecipeIngredientsInput, FoodUncheckedUpdateWithoutRecipeIngredientsInput>
    create: XOR<FoodCreateWithoutRecipeIngredientsInput, FoodUncheckedCreateWithoutRecipeIngredientsInput>
    where?: FoodWhereInput
  }

  export type FoodUpdateToOneWithWhereWithoutRecipeIngredientsInput = {
    where?: FoodWhereInput
    data: XOR<FoodUpdateWithoutRecipeIngredientsInput, FoodUncheckedUpdateWithoutRecipeIngredientsInput>
  }

  export type FoodUpdateWithoutRecipeIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUpdateManyWithoutFoodNestedInput
  }

  export type FoodUncheckedUpdateWithoutRecipeIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutFoodNestedInput
  }

  export type CustomFoodUpsertWithoutRecipeIngredientsInput = {
    update: XOR<CustomFoodUpdateWithoutRecipeIngredientsInput, CustomFoodUncheckedUpdateWithoutRecipeIngredientsInput>
    create: XOR<CustomFoodCreateWithoutRecipeIngredientsInput, CustomFoodUncheckedCreateWithoutRecipeIngredientsInput>
    where?: CustomFoodWhereInput
  }

  export type CustomFoodUpdateToOneWithWhereWithoutRecipeIngredientsInput = {
    where?: CustomFoodWhereInput
    data: XOR<CustomFoodUpdateWithoutRecipeIngredientsInput, CustomFoodUncheckedUpdateWithoutRecipeIngredientsInput>
  }

  export type CustomFoodUpdateWithoutRecipeIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomFoodsNestedInput
    foodLogs?: FoodLogUpdateManyWithoutCustomFoodNestedInput
  }

  export type CustomFoodUncheckedUpdateWithoutRecipeIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutCustomFoodNestedInput
  }

  export type UserCreateWithoutFoodLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFoodLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFoodLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFoodLogsInput, UserUncheckedCreateWithoutFoodLogsInput>
  }

  export type FoodCreateWithoutFoodLogsInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeIngredients?: RecipeIngredientCreateNestedManyWithoutFoodInput
  }

  export type FoodUncheckedCreateWithoutFoodLogsInput = {
    id?: string
    name: string
    category: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    barcode?: string | null
    externalSource?: string | null
    externalId?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeIngredients?: RecipeIngredientUncheckedCreateNestedManyWithoutFoodInput
  }

  export type FoodCreateOrConnectWithoutFoodLogsInput = {
    where: FoodWhereUniqueInput
    create: XOR<FoodCreateWithoutFoodLogsInput, FoodUncheckedCreateWithoutFoodLogsInput>
  }

  export type CustomFoodCreateWithoutFoodLogsInput = {
    id?: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCustomFoodsInput
    recipeIngredients?: RecipeIngredientCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodUncheckedCreateWithoutFoodLogsInput = {
    id?: string
    userId: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeIngredients?: RecipeIngredientUncheckedCreateNestedManyWithoutCustomFoodInput
  }

  export type CustomFoodCreateOrConnectWithoutFoodLogsInput = {
    where: CustomFoodWhereUniqueInput
    create: XOR<CustomFoodCreateWithoutFoodLogsInput, CustomFoodUncheckedCreateWithoutFoodLogsInput>
  }

  export type RecipeCreateWithoutFoodLogsInput = {
    id?: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRecipesInput
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutFoodLogsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutFoodLogsInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutFoodLogsInput, RecipeUncheckedCreateWithoutFoodLogsInput>
  }

  export type UserUpsertWithoutFoodLogsInput = {
    update: XOR<UserUpdateWithoutFoodLogsInput, UserUncheckedUpdateWithoutFoodLogsInput>
    create: XOR<UserCreateWithoutFoodLogsInput, UserUncheckedCreateWithoutFoodLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFoodLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFoodLogsInput, UserUncheckedUpdateWithoutFoodLogsInput>
  }

  export type UserUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FoodUpsertWithoutFoodLogsInput = {
    update: XOR<FoodUpdateWithoutFoodLogsInput, FoodUncheckedUpdateWithoutFoodLogsInput>
    create: XOR<FoodCreateWithoutFoodLogsInput, FoodUncheckedCreateWithoutFoodLogsInput>
    where?: FoodWhereInput
  }

  export type FoodUpdateToOneWithWhereWithoutFoodLogsInput = {
    where?: FoodWhereInput
    data: XOR<FoodUpdateWithoutFoodLogsInput, FoodUncheckedUpdateWithoutFoodLogsInput>
  }

  export type FoodUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeIngredients?: RecipeIngredientUpdateManyWithoutFoodNestedInput
  }

  export type FoodUncheckedUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    externalSource?: NullableStringFieldUpdateOperationsInput | string | null
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeIngredients?: RecipeIngredientUncheckedUpdateManyWithoutFoodNestedInput
  }

  export type CustomFoodUpsertWithoutFoodLogsInput = {
    update: XOR<CustomFoodUpdateWithoutFoodLogsInput, CustomFoodUncheckedUpdateWithoutFoodLogsInput>
    create: XOR<CustomFoodCreateWithoutFoodLogsInput, CustomFoodUncheckedCreateWithoutFoodLogsInput>
    where?: CustomFoodWhereInput
  }

  export type CustomFoodUpdateToOneWithWhereWithoutFoodLogsInput = {
    where?: CustomFoodWhereInput
    data: XOR<CustomFoodUpdateWithoutFoodLogsInput, CustomFoodUncheckedUpdateWithoutFoodLogsInput>
  }

  export type CustomFoodUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomFoodsNestedInput
    recipeIngredients?: RecipeIngredientUpdateManyWithoutCustomFoodNestedInput
  }

  export type CustomFoodUncheckedUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeIngredients?: RecipeIngredientUncheckedUpdateManyWithoutCustomFoodNestedInput
  }

  export type RecipeUpsertWithoutFoodLogsInput = {
    update: XOR<RecipeUpdateWithoutFoodLogsInput, RecipeUncheckedUpdateWithoutFoodLogsInput>
    create: XOR<RecipeCreateWithoutFoodLogsInput, RecipeUncheckedCreateWithoutFoodLogsInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutFoodLogsInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutFoodLogsInput, RecipeUncheckedUpdateWithoutFoodLogsInput>
  }

  export type RecipeUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutFoodLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type UserCreateWithoutWaterLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWaterLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWaterLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWaterLogsInput, UserUncheckedCreateWithoutWaterLogsInput>
  }

  export type UserUpsertWithoutWaterLogsInput = {
    update: XOR<UserUpdateWithoutWaterLogsInput, UserUncheckedUpdateWithoutWaterLogsInput>
    create: XOR<UserCreateWithoutWaterLogsInput, UserUncheckedCreateWithoutWaterLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWaterLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWaterLogsInput, UserUncheckedUpdateWithoutWaterLogsInput>
  }

  export type UserUpdateWithoutWaterLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWaterLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWeightLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWeightLogsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWeightLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWeightLogsInput, UserUncheckedCreateWithoutWeightLogsInput>
  }

  export type UserUpsertWithoutWeightLogsInput = {
    update: XOR<UserUpdateWithoutWeightLogsInput, UserUncheckedUpdateWithoutWeightLogsInput>
    create: XOR<UserCreateWithoutWeightLogsInput, UserUncheckedCreateWithoutWeightLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWeightLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWeightLogsInput, UserUncheckedUpdateWithoutWeightLogsInput>
  }

  export type UserUpdateWithoutWeightLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWeightLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActivitiesInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogCreateNestedManyWithoutUserInput
    activities?: ActivityLogCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    name: string
    age?: number | null
    sex?: string | null
    height?: number | null
    currentWeight?: number | null
    goalWeight?: number | null
    activityLevel?: string | null
    gymDaysPerWeek?: number | null
    dailyWalkKm?: number | null
    gymMinutesPerSession?: number | null
    goal?: string | null
    goalDate?: Date | string | null
    profileCompleted?: boolean
    isAdmin?: boolean
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: SettingsUncheckedCreateNestedOneWithoutUserInput
    foodLogs?: FoodLogUncheckedCreateNestedManyWithoutUserInput
    waterLogs?: WaterLogUncheckedCreateNestedManyWithoutUserInput
    weightLogs?: WeightLogUncheckedCreateNestedManyWithoutUserInput
    activities?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    customFoods?: CustomFoodUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    sex?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    currentWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    goalWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    gymDaysPerWeek?: NullableIntFieldUpdateOperationsInput | number | null
    dailyWalkKm?: NullableFloatFieldUpdateOperationsInput | number | null
    gymMinutesPerSession?: NullableIntFieldUpdateOperationsInput | number | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    goalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: SettingsUncheckedUpdateOneWithoutUserNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutUserNestedInput
    waterLogs?: WaterLogUncheckedUpdateManyWithoutUserNestedInput
    weightLogs?: WeightLogUncheckedUpdateManyWithoutUserNestedInput
    activities?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    customFoods?: CustomFoodUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FoodLogCreateManyUserInput = {
    id?: string
    foodId?: string | null
    customFoodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WaterLogCreateManyUserInput = {
    id?: string
    amount: number
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type WeightLogCreateManyUserInput = {
    id?: string
    weight: number
    note?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type ActivityLogCreateManyUserInput = {
    id?: string
    activityType: string
    name: string
    duration: number
    caloriesBurned: number
    notes?: string | null
    sets?: number | null
    reps?: number | null
    weightUsed?: number | null
    muscleGroup?: string | null
    startWeight?: number | null
    startReps?: number | null
    endWeight?: number | null
    endReps?: number | null
    totalVolume?: number | null
    distance?: number | null
    speed?: number | null
    pace?: number | null
    stroke?: string | null
    logDate?: Date | string
    createdAt?: Date | string
  }

  export type CustomFoodCreateManyUserInput = {
    id?: string
    name: string
    category?: string
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    servings?: number
    servingSize: number
    servingUnit?: string
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    totalWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: string
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type FoodLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    food?: FoodUpdateOneWithoutFoodLogsNestedInput
    customFood?: CustomFoodUpdateOneWithoutFoodLogsNestedInput
    recipe?: RecipeUpdateOneWithoutFoodLogsNestedInput
  }

  export type FoodLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaterLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeightLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    duration?: FloatFieldUpdateOperationsInput | number
    caloriesBurned?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    sets?: NullableIntFieldUpdateOperationsInput | number | null
    reps?: NullableIntFieldUpdateOperationsInput | number | null
    weightUsed?: NullableFloatFieldUpdateOperationsInput | number | null
    muscleGroup?: NullableStringFieldUpdateOperationsInput | string | null
    startWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    startReps?: NullableIntFieldUpdateOperationsInput | number | null
    endWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    endReps?: NullableIntFieldUpdateOperationsInput | number | null
    totalVolume?: NullableFloatFieldUpdateOperationsInput | number | null
    distance?: NullableFloatFieldUpdateOperationsInput | number | null
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    pace?: NullableFloatFieldUpdateOperationsInput | number | null
    stroke?: NullableStringFieldUpdateOperationsInput | string | null
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFoodUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUpdateManyWithoutCustomFoodNestedInput
    recipeIngredients?: RecipeIngredientUpdateManyWithoutCustomFoodNestedInput
  }

  export type CustomFoodUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foodLogs?: FoodLogUncheckedUpdateManyWithoutCustomFoodNestedInput
    recipeIngredients?: RecipeIngredientUncheckedUpdateManyWithoutCustomFoodNestedInput
  }

  export type CustomFoodUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
    foodLogs?: FoodLogUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
    foodLogs?: FoodLogUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: FloatFieldUpdateOperationsInput | number
    servingSize?: FloatFieldUpdateOperationsInput | number
    servingUnit?: StringFieldUpdateOperationsInput | string
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sugar?: FloatFieldUpdateOperationsInput | number
    sodium?: FloatFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogCreateManyFoodInput = {
    id?: string
    userId: string
    customFoodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeIngredientCreateManyFoodInput = {
    id?: string
    recipeId: string
    name: string
    customFoodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type FoodLogUpdateWithoutFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFoodLogsNestedInput
    customFood?: CustomFoodUpdateOneWithoutFoodLogsNestedInput
    recipe?: RecipeUpdateOneWithoutFoodLogsNestedInput
  }

  export type FoodLogUncheckedUpdateWithoutFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyWithoutFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeIngredientUpdateWithoutFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    recipe?: RecipeUpdateOneRequiredWithoutIngredientsNestedInput
    customFood?: CustomFoodUpdateOneWithoutRecipeIngredientsNestedInput
  }

  export type RecipeIngredientUncheckedUpdateWithoutFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type FoodLogCreateManyCustomFoodInput = {
    id?: string
    userId: string
    foodId?: string | null
    recipeId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeIngredientCreateManyCustomFoodInput = {
    id?: string
    recipeId: string
    name: string
    foodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type FoodLogUpdateWithoutCustomFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFoodLogsNestedInput
    food?: FoodUpdateOneWithoutFoodLogsNestedInput
    recipe?: RecipeUpdateOneWithoutFoodLogsNestedInput
  }

  export type FoodLogUncheckedUpdateWithoutCustomFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyWithoutCustomFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeIngredientUpdateWithoutCustomFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    recipe?: RecipeUpdateOneRequiredWithoutIngredientsNestedInput
    food?: FoodUpdateOneWithoutRecipeIngredientsNestedInput
  }

  export type RecipeIngredientUncheckedUpdateWithoutCustomFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutCustomFoodInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RecipeIngredientCreateManyRecipeInput = {
    id?: string
    name: string
    foodId?: string | null
    customFoodId?: string | null
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sortOrder?: number
  }

  export type FoodLogCreateManyRecipeInput = {
    id?: string
    userId: string
    foodId?: string | null
    customFoodId?: string | null
    mealType: string
    amount: number
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    logDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeIngredientUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    food?: FoodUpdateOneWithoutRecipeIngredientsNestedInput
    customFood?: CustomFoodUpdateOneWithoutRecipeIngredientsNestedInput
  }

  export type RecipeIngredientUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type FoodLogUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFoodLogsNestedInput
    food?: FoodUpdateOneWithoutFoodLogsNestedInput
    customFood?: CustomFoodUpdateOneWithoutFoodLogsNestedInput
  }

  export type FoodLogUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodLogUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    foodId?: NullableStringFieldUpdateOperationsInput | string | null
    customFoodId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    calories?: FloatFieldUpdateOperationsInput | number
    protein?: FloatFieldUpdateOperationsInput | number
    carbs?: FloatFieldUpdateOperationsInput | number
    fat?: FloatFieldUpdateOperationsInput | number
    fiber?: FloatFieldUpdateOperationsInput | number
    logDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FoodCountOutputTypeDefaultArgs instead
     */
    export type FoodCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FoodCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomFoodCountOutputTypeDefaultArgs instead
     */
    export type CustomFoodCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomFoodCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecipeCountOutputTypeDefaultArgs instead
     */
    export type RecipeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecipeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingsDefaultArgs instead
     */
    export type SettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FoodDefaultArgs instead
     */
    export type FoodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FoodDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomFoodDefaultArgs instead
     */
    export type CustomFoodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomFoodDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecipeDefaultArgs instead
     */
    export type RecipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecipeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecipeIngredientDefaultArgs instead
     */
    export type RecipeIngredientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecipeIngredientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FoodLogDefaultArgs instead
     */
    export type FoodLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FoodLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WaterLogDefaultArgs instead
     */
    export type WaterLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WaterLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WeightLogDefaultArgs instead
     */
    export type WeightLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WeightLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivityLogDefaultArgs instead
     */
    export type ActivityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivityLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}