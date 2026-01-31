export const paths = [
  {
    id: "basics",
    title: "SQL Foundations",
    description: "Core concepts of relational databases and basic query structure.",
    concepts: ["what-is-sql", "tables-rows-columns", "primary-keys", "select-basics", "where-filtering", "order-by", "limit-offset", "dml-conceptual"]
  },
  {
    id: "indexing",
    title: "The Indexing Galaxy",
    description: "Understanding data structures that accelerate queries.",
    concepts: ["indexes-overview", "b-tree-structure", "index-seek-vs-scan", "table-scan", "composite-indexes", "covering-indexes", "unique-indexes"]
  },
  {
    id: "relationships",
    title: "Relational Dynamics",
    description: "Joining data across the relational universe.",
    concepts: ["joins-basics", "join-algorithms", "subqueries", "ctes"]
  },
  {
    id: "aggregation",
    title: "Data Synthesis",
    description: "Collapsing and analyzing data sets.",
    concepts: ["group-by", "aggregations", "having"]
  },
  {
    id: "internals",
    title: "The Engine Core",
    description: "Deep dive into the query optimizer and execution engine.",
    concepts: ["query-planner", "execution-plans", "cost-estimation", "cardinality", "selectivity"]
  },
  {
    id: "performance",
    title: "Optimized Trajectories",
    description: "Avoiding common pitfalls and slow query patterns.",
    concepts: ["index-misuse", "over-indexing", "write-amplification", "pagination-pitfalls", "n-plus-one", "slow-query-patterns"]
  }
];

export const concepts = [
  // FOUNDATIONS
  {
    id: "what-is-sql",
    title: "What is SQL",
    path: "basics",
    difficulty: "Beginner",
    definition: "Structured Query Language (SQL) is the standard language for interacting with Relational Database Management Systems (RDBMS).",
    performance: "Declarative nature allows the engine to optimize execution without user intervention.",
    visualType: "flow",
    exampleQuery: "SELECT * FROM universe;"
  },
  {
    id: "tables-rows-columns",
    title: "Tables, Rows, Columns",
    path: "basics",
    difficulty: "Beginner",
    definition: "The fundamental storage units. Tables (Relations) contain Rows (Tuples) and Columns (Attributes).",
    performance: "Column order and data types impact storage alignment and scan speed.",
    visualType: "table",
    exampleQuery: "CREATE TABLE stars (id INT, name TEXT);"
  },
  {
    id: "primary-keys",
    title: "Primary Keys",
    path: "basics",
    difficulty: "Beginner",
    definition: "A unique identifier for every row in a table. It must be unique and non-null.",
    performance: "Acts as the 'Clustered Index' in many engines, physically ordering the data.",
    visualType: "table",
    exampleQuery: "ALTER TABLE stars ADD PRIMARY KEY (id);"
  },
  {
    id: "select-basics",
    title: "SELECT Basics",
    path: "basics",
    difficulty: "Beginner",
    definition: "The projection operator. Defines which 'dimensions' of the data to retrieve.",
    performance: "Select only needed columns to reduce I/O and memory usage (avoid SELECT *).",
    visualType: "flow",
    exampleQuery: "SELECT name, magnitude FROM stars;"
  },
  {
    id: "where-filtering",
    title: "WHERE Filtering",
    path: "basics",
    difficulty: "Beginner",
    definition: "The selection operator. Restricts rows based on specific logical predicates.",
    performance: "Sargable predicates allow the engine to use indexes instead of full table scans.",
    visualType: "filter",
    exampleQuery: "SELECT * FROM stars WHERE magnitude < 2.0;"
  },
  {
    id: "order-by",
    title: "ORDER BY",
    path: "basics",
    difficulty: "Beginner",
    definition: "Sorts the resulting rows based on one or more columns.",
    performance: "Expensive if not backed by an index; may require 'External Merge Sort' on disk.",
    visualType: "sort",
    exampleQuery: "SELECT * FROM stars ORDER BY name ASC;"
  },
  {
    id: "limit-offset",
    title: "LIMIT & OFFSET",
    path: "basics",
    difficulty: "Beginner",
    definition: "Restrict the number of rows returned and skip a specific number of leading rows.",
    performance: "High OFFSET values cause 'Deep Paging' performance degradation as skipped rows are still processed.",
    visualType: "paging",
    exampleQuery: "SELECT * FROM stars LIMIT 10 OFFSET 100;"
  },
  {
    id: "dml-conceptual",
    title: "INSERT / UPDATE / DELETE",
    path: "basics",
    difficulty: "Beginner",
    definition: "Data Manipulation Language. Conceptual flow of adding, changing, or removing records.",
    performance: "Triggers index updates and Write-Ahead Log (WAL) entries, adding latency.",
    visualType: "dml",
    exampleQuery: "INSERT INTO stars VALUES (1, 'Sirius');"
  },

  // INDEXING
  {
    id: "indexes-overview",
    title: "Indexes Overview",
    path: "indexing",
    difficulty: "Intermediate",
    definition: "A secondary data structure that provides a fast path to rows without scanning the whole table.",
    performance: "Trade-off: Speeds up reads, slows down writes (maintenance overhead).",
    visualType: "index",
    exampleQuery: "CREATE INDEX idx_star_name ON stars(name);"
  },
  {
    id: "b-tree-structure",
    title: "B-Tree Index Structure",
    path: "indexing",
    difficulty: "Advanced",
    definition: "A self-balancing tree structure where leaf nodes contain pointers to data or the data itself.",
    performance: "Provides O(log N) lookup, insertion, and deletion time.",
    visualType: "tree",
    exampleQuery: "-- Internal structure visualization"
  },
  {
    id: "index-seek-vs-scan",
    title: "Index Seek vs Index Scan",
    path: "indexing",
    difficulty: "Advanced",
    definition: "Seek navigates the tree to a specific point; Scan reads the entire index range.",
    performance: "Seek is highly efficient; Scan is better for large ranges but slower than Seek.",
    visualType: "search",
    exampleQuery: "EXPLAIN SELECT * FROM stars WHERE id = 5;"
  },
  {
    id: "table-scan",
    title: "Table Scan",
    path: "indexing",
    difficulty: "Intermediate",
    definition: "Reading every page of the table from start to finish.",
    performance: "O(N) cost. Acceptable for small tables, disastrous for large ones without filtering.",
    visualType: "scan",
    exampleQuery: "SELECT * FROM stars; -- No WHERE clause"
  },
  {
    id: "composite-indexes",
    title: "Composite Indexes",
    path: "indexing",
    difficulty: "Advanced",
    definition: "An index built on multiple columns. Order of columns matters (Left-Prefix Rule).",
    performance: "Allows one index to satisfy queries filtering on multiple columns.",
    visualType: "composite",
    exampleQuery: "CREATE INDEX idx_coord ON stars(galaxy, sector);"
  },
  {
    id: "covering-indexes",
    title: "Covering Indexes",
    path: "indexing",
    difficulty: "Expert",
    definition: "An index that contains all columns requested by a query, avoiding a 'Table Lookup'.",
    performance: "Extreme performance boost as it eliminates the need to visit the actual table pages.",
    visualType: "coverage",
    exampleQuery: "SELECT name FROM stars WHERE id = 10; -- if id and name are in index"
  },
  {
    id: "unique-indexes",
    title: "Unique Indexes",
    path: "indexing",
    difficulty: "Intermediate",
    definition: "An index that ensures no two rows have the same value in the indexed column(s).",
    performance: "Slight overhead on writes to check for existence, but ensures data integrity.",
    visualType: "unique",
    exampleQuery: "CREATE UNIQUE INDEX idx_constellation ON stars(code);"
  },

  // RELATIONSHIPS
  {
    id: "joins-basics",
    title: "Joins (INNER, LEFT, RIGHT)",
    path: "relationships",
    difficulty: "Intermediate",
    definition: "Combining rows from two or more tables based on a related column.",
    performance: "Join order and join types significantly impact the query plan's total cost.",
    visualType: "join",
    exampleQuery: "SELECT * FROM stars JOIN galaxies ON stars.g_id = galaxies.id;"
  },
  {
    id: "join-algorithms",
    title: "Join Algorithms (Nested Loop, Hash Join)",
    path: "relationships",
    difficulty: "Expert",
    definition: "The physical strategy used to join data: iterating through rows vs. building a hash table.",
    performance: "Nested Loop: Good for small sets/indexed joins. Hash Join: Best for large, unindexed sets.",
    visualType: "algorithm",
    exampleQuery: "EXPLAIN ANALYZE SELECT * FROM a JOIN b ON a.id = b.id;"
  },
  {
    id: "subqueries",
    title: "Subqueries",
    path: "relationships",
    difficulty: "Intermediate",
    definition: "A query nested inside another query (SELECT, FROM, or WHERE).",
    performance: "Can be inefficient if 'Correlated'. Modern optimizers often rewrite these as Joins.",
    visualType: "nested",
    exampleQuery: "SELECT * FROM stars WHERE g_id IN (SELECT id FROM galaxies);"
  },
  {
    id: "ctes",
    title: "CTEs (Common Table Expressions)",
    path: "relationships",
    difficulty: "Intermediate",
    definition: "Temporary named result sets using the WITH clause for better readability and recursion.",
    performance: "Readability vs Optimization: Some engines 'materialize' CTEs, which can be slower.",
    visualType: "cte",
    exampleQuery: "WITH local_stars AS (SELECT * FROM stars) SELECT * FROM local_stars;"
  },

  // AGGREGATION
  {
    id: "group-by",
    title: "GROUP BY",
    path: "aggregation",
    difficulty: "Intermediate",
    definition: "Aggregates rows into groups based on column values.",
    performance: "Requires sorting or hashing the entire dataset to group effectively.",
    visualType: "group",
    exampleQuery: "SELECT galaxy, COUNT(*) FROM stars GROUP BY galaxy;"
  },
  {
    id: "aggregations",
    title: "Aggregations",
    path: "aggregation",
    difficulty: "Beginner",
    definition: "Functions like COUNT, SUM, AVG, MIN, MAX that return a single value from a set.",
    performance: "Usually fast, but COUNT(DISTINCT) requires significant memory/sorting.",
    visualType: "aggregate",
    exampleQuery: "SELECT AVG(magnitude) FROM stars;"
  },
  {
    id: "having",
    title: "HAVING",
    path: "aggregation",
    difficulty: "Intermediate",
    definition: "Filters groups after the GROUP BY operation has occurred.",
    performance: "Happens late in the execution pipeline; cannot use standard indexes directly.",
    visualType: "filter-late",
    exampleQuery: "SELECT galaxy FROM stars GROUP BY galaxy HAVING COUNT(*) > 100;"
  },

  // INTERNALS
  {
    id: "query-planner",
    title: "Query Planner / Optimizer",
    path: "internals",
    difficulty: "Expert",
    definition: "The database component that determines the most efficient way to execute a query.",
    performance: "Heart of the DB. Relies on statistics to choose between Scan, Index, or Join types.",
    visualType: "planner",
    exampleQuery: "-- Internal process"
  },
  {
    id: "execution-plans",
    title: "Execution Plans (EXPLAIN)",
    path: "internals",
    difficulty: "Advanced",
    definition: "The visual or textual map of physical operators (Scans, Joins, Sorts) the DB will use.",
    performance: "Essential for debugging slow queries and verifying index usage.",
    visualType: "plan",
    exampleQuery: "EXPLAIN (FORMAT JSON) SELECT * FROM stars;"
  },
  {
    id: "cost-estimation",
    title: "Cost Estimation",
    path: "internals",
    difficulty: "Expert",
    definition: "Assigning arbitrary 'cost' units to different operations based on I/O and CPU requirements.",
    performance: "Optimizers aim for the plan with the 'Lowest Cost', which might not always be the fastest.",
    visualType: "cost",
    exampleQuery: "-- Unit calculation"
  },
  {
    id: "cardinality",
    title: "Cardinality",
    path: "internals",
    difficulty: "Advanced",
    definition: "The number of unique values in a column or the estimated number of rows in a result set.",
    performance: "Low cardinality (e.g., Gender) makes indexes less effective than high cardinality (e.g., UUID).",
    visualType: "cardinality",
    exampleQuery: "-- Stat check"
  },
  {
    id: "selectivity",
    title: "Selectivity",
    path: "internals",
    difficulty: "Advanced",
    definition: "The fraction of rows returned by a filter. (rows_filtered / total_rows).",
    performance: "High selectivity (returns few rows) is the primary driver for choosing an index scan.",
    visualType: "selectivity",
    exampleQuery: "-- Stat calculation"
  },

  // PERFORMANCE PITFALLS
  {
    id: "index-misuse",
    title: "Index Misuse",
    path: "performance",
    difficulty: "Advanced",
    definition: "Queries that prevent index usage (Non-Sargable), like using functions on indexed columns.",
    performance: "Transforms an O(log N) lookup into an O(N) table scan.",
    visualType: "misuse",
    exampleQuery: "SELECT * FROM stars WHERE UPPER(name) = 'SIRIUS';"
  },
  {
    id: "over-indexing",
    title: "Over-indexing",
    path: "performance",
    difficulty: "Intermediate",
    definition: "Adding too many indexes to a single table.",
    performance: "Severely degrades INSERT/UPDATE performance and wastes disk/buffer pool space.",
    visualType: "bloat",
    exampleQuery: "-- 20+ indexes on 5 columns"
  },
  {
    id: "write-amplification",
    title: "Write Amplification",
    path: "performance",
    difficulty: "Expert",
    definition: "One logical write resulting in multiple physical writes (Tables, Indexes, WAL).",
    performance: "Impacts SSD lifespan and write throughput in high-volume systems.",
    visualType: "writes",
    exampleQuery: "-- One INSERT, 5 index updates"
  },
  {
    id: "pagination-pitfalls",
    title: "Pagination Pitfalls",
    path: "performance",
    difficulty: "Advanced",
    definition: "Using OFFSET for deep pages, which forces the DB to read and discard all previous rows.",
    performance: "Linear performance degradation as you move to higher page numbers.",
    visualType: "pitfall",
    exampleQuery: "SELECT * FROM stars LIMIT 10 OFFSET 1000000;"
  },
  {
    id: "n-plus-one",
    title: "N+1 Queries",
    path: "performance",
    difficulty: "Intermediate",
    definition: "Executing one query to get IDs, then N queries to get data for each ID.",
    performance: "Massive network latency overhead. Should be replaced with a single JOIN or IN clause.",
    visualType: "network",
    exampleQuery: "foreach star: SELECT * FROM galaxies WHERE id = star.g_id"
  },
  {
    id: "slow-query-patterns",
    title: "Slow Query Patterns",
    path: "performance",
    difficulty: "Advanced",
    definition: "Common anti-patterns like leading wildcards (%name) or large cross joins.",
    performance: "Disables index usage and creates massive Cartesian products in memory.",
    visualType: "pattern",
    exampleQuery: "SELECT * FROM stars WHERE name LIKE '%sirius';"
  }
];
