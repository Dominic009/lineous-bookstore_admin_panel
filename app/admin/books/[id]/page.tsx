"use client";

import { use } from "react";
import {
  ArrowLeft,
  Star,
  BookOpen,
  Tag,
  Hash,
  DollarSign,
  Package,
  Calendar,
  FileText,
  ShoppingCart,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReviewDialog } from "@/components/reviews/review-dialog";
import { useBook } from "@/lib/hooks/use-books";
import { useReviews } from "@/lib/hooks/use-reviews";
import { useRouter } from "next/navigation";
import type { Book, Review } from "@/lib/types/book";
import { StatusBadge } from "@/components/books/status-badge";
import { BookPapersManager } from "@/components/books/book-papers-manager";

interface BookDetailPageProps {
  params: Promise<{ id: string }>;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating}/5</span>
    </div>
  );
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: book, isLoading, error } = useBook(id);
  const { data: reviews } = useReviews(id);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <p className="text-destructive">Book not found</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const averageRating = reviews?.length
    ? reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) /
      reviews.length
    : 0;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/books")}
          className="h-auto p-0"
        >
          Books
        </Button>
        <span>/</span>
        <span className="truncate font-medium text-foreground">
          {book.title}
        </span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left - Image */}
        <div className="flex items-center justify-center rounded-2xl border border-border/60 bg-muted/30 p-8">
          <div className="flex h-80 w-56 items-center justify-center rounded-lg bg-white shadow-lg">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <BookOpen className="h-20 w-20 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Right - Details */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <StatusBadge status={book.status} />
              {book.papers && book.papers.length > 0 && (
                <Badge
                  variant="outline"
                  className="border-emerald-200 text-emerald-700"
                >
                  {book.papers.length} Paper
                  {book.papers.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
            {book.shortDescription && (
              <p className="mt-2 text-lg text-muted-foreground">
                {book.shortDescription}
              </p>
            )}
          </div>

          <Separator />

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                {book.priceRange?.display || "No papers"}
              </span>
            </div>

            {reviews && reviews.length > 0 && (
              <div className="flex items-center gap-3">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-sm text-muted-foreground">
                  {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          <Separator />

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            {book.publication && (
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Publication:</span>
                <span className="font-medium">{book.publication.name}</span>
              </div>
            )}

            {book.subject && (
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Subject:</span>
                <span className="font-medium">{book.subject.name}</span>
              </div>
            )}

            {book.edition && (
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Edition:</span>
                <span className="font-medium">{book.edition}</span>
              </div>
            )}

            {book.language && (
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Language:</span>
                <span className="font-medium">{book.language}</span>
              </div>
            )}

            {book.publicationDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Published:</span>
                <span className="font-medium">
                  {new Date(book.publicationDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              className="gap-2"
              variant="outline"
              onClick={() => router.push(`/admin/books/${book.id}/edit`)}
            >
              Edit Book
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      {book.description && (
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Description</h2>
              <p className="whitespace-pre-line text-muted-foreground">
                {book.description}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Papers Management Section */}
      <div className="mt-12">
        <BookPapersManager bookId={book.id} bookTitle={book.title} />
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <ReviewDialog
                bookId={book.id}
                trigger={
                  <Button size="sm" className="gap-2">
                    <Star className="h-4 w-4" />
                    Write a Review
                  </Button>
                }
              />
            </div>

            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review: Review) => (
                  <Card key={review.id} className="border-border/60">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {review.reviewerName}
                          </h4>
                          {review.designation && (
                            <p className="text-sm text-muted-foreground">
                              {review.designation}
                            </p>
                          )}
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      {review.comment && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                No reviews yet. Be the first to review this book!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
